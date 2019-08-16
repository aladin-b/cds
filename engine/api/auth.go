package api

import (
	"context"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/ovh/cds/engine/api/authentication"
	"github.com/ovh/cds/engine/api/authentication/local"
	"github.com/ovh/cds/engine/api/user"
	"github.com/ovh/cds/engine/service"
	"github.com/ovh/cds/sdk"
)

func (api *API) getAuthDriversHandler() service.Handler {
	return func(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
		drivers := []sdk.AuthDriverManifest{}

		for _, d := range api.AuthenticationDrivers {
			drivers = append(drivers, d.GetManifest())
		}

		countAdmins, err := user.CountAdmin(api.mustDB())
		if err != nil {
			return err
		}

		var response = struct {
			IsFirstConnection bool                     `json:"is_first_connection"`
			Drivers           []sdk.AuthDriverManifest `json:"manifests"`
		}{
			IsFirstConnection: countAdmins == 0,
			Drivers:           drivers,
		}

		return service.WriteJSON(w, response, http.StatusOK)
	}
}

func (api *API) getAuthScopesHandler() service.Handler {
	return func(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
		return service.WriteJSON(w, sdk.AuthConsumerScopes, http.StatusOK)
	}
}

func (api *API) getAuthAskSigninHandler() service.Handler {
	return func(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
		vars := mux.Vars(r)

		// Extract consumer type from request, is invalid or not in api drivers list return an error
		consumerType := sdk.AuthConsumerType(vars["consumerType"])
		if !consumerType.IsValid() {
			return sdk.WithStack(sdk.ErrNotFound)
		}
		driver, ok := api.AuthenticationDrivers[consumerType]
		if !ok {
			return sdk.WithStack(sdk.ErrNotFound)
		}

		// Get the origin from request if set
		origin := FormString(r, "origin")
		if origin != "" && !(origin == "cdsctl" || origin == "ui") {
			return sdk.NewErrorFrom(sdk.ErrWrongRequest, "invalid given origin value")
		}

		// Generate a new state value for the auth signin request
		state, err := authentication.NewSigninStateToken(origin)
		if err != nil {
			return err
		}

		// Redirect to the right signin page depending on the consumer type
		http.Redirect(w, r, driver.GetSigninURI(state), http.StatusTemporaryRedirect)
		return nil
	}
}

func (api *API) postAuthSigninHandler() service.Handler {
	return func(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
		vars := mux.Vars(r)

		// Extract consumer type from request, is invalid or not in api drivers list return an error
		consumerType := sdk.AuthConsumerType(vars["consumerType"])
		if !consumerType.IsValid() {
			return sdk.WithStack(sdk.ErrNotFound)
		}
		driver, ok := api.AuthenticationDrivers[consumerType]
		if !ok {
			return sdk.WithStack(sdk.ErrNotFound)
		}

		// Extract and validate signin request
		var req sdk.AuthConsumerSigninRequest
		if err := service.UnmarshalBody(r, &req); err != nil {
			return err
		}
		if err := driver.CheckSigninRequest(req); err != nil {
			return err
		}

		initToken, hasInitToken := req["init_token"]
		hasInitToken = hasInitToken && initToken != ""

		// if consumerType is LDAP we must bind the requested user
		switch consumerType {
		case sdk.ConsumerLDAP, sdk.ConsumerTest, sdk.ConsumerTest2:
		default:
			// Check if state is given and if its valid
			state, okState := req["state"]
			if !okState {
				return sdk.NewErrorFrom(sdk.ErrWrongRequest, "missing state value")
			}
			if err := authentication.CheckSigninStateToken(state); err != nil {
				return err
			}
		}

		// Convert code to external user info
		userInfo, err := driver.GetUserInfo(req)
		if err != nil {
			return err
		}

		tx, err := api.mustDB().Begin()
		if err != nil {
			return sdk.WithStack(err)
		}
		defer tx.Rollback() // nolint

		// Check if a user already exists for external username
		u, err := user.LoadByUsername(ctx, tx, userInfo.Username, user.LoadOptions.WithContacts)
		if err != nil && !sdk.ErrorIs(err, sdk.ErrUserNotFound) {
			return err
		}

		var signupDone bool

		if u == nil {
			// Check if a user already exists for external email
			contact, err := user.LoadContactsByTypeAndValue(ctx, tx, sdk.UserContactTypeEmail, userInfo.Email)
			if err != nil && !sdk.ErrorIs(err, sdk.ErrNotFound) {
				return err
			}
			if contact != nil {
				// A user already exists with an other username but the same email address
				u, err = user.LoadByID(ctx, tx, contact.UserID, user.LoadOptions.WithContacts)
				if err != nil {
					return err
				}
			} else {
				// We can't find any user with the same username of the same email address
				// So we will do signup for a new user from the data got from the auth driver
				if driver.GetManifest().SignupDisabled {
					return sdk.WithStack(sdk.ErrSignupDisabled)
				}

				u = &sdk.AuthentifiedUser{
					Ring:     sdk.UserRingUser,
					Username: userInfo.Username,
					Fullname: userInfo.Fullname,
				}

				// If a magic token is given and there is no admin already registered, set new user as admin
				countAdmins, err := user.CountAdmin(tx)
				if err != nil {
					return err
				}
				if countAdmins == 0 && hasInitToken {
					u.Ring = sdk.UserRingAdmin
				} else {
					hasInitToken = false
				}

				// Insert the new user in database
				if err := user.Insert(tx, u); err != nil {
					return err
				}

				userContact := sdk.UserContact{
					Primary:  true,
					Type:     sdk.UserContactTypeEmail,
					UserID:   u.ID,
					Value:    userInfo.Email,
					Verified: true,
				}

				// Insert the primary contact for the new user in database
				if err := user.InsertContact(tx, &userContact); err != nil {
					return err
				}

				signupDone = true
			}
		} else {
			// If the user exists with the same email address than in the userInfo,
			// we will create a new consumer and continue the signin
			// else we raise an error
			if u.GetEmail() != userInfo.Email {
				return sdk.NewErrorFrom(sdk.ErrForbidden, "a user already exists for user name %s", userInfo.Username)
			}

		}

		// Check if a consumer exists for consumer type and external user identifier
		consumer, err := authentication.LoadConsumerByTypeAndUserExternalID(ctx, tx, consumerType, userInfo.ExternalID)
		if err != nil && !sdk.ErrorIs(err, sdk.ErrNotFound) {
			return err
		}

		if consumer == nil {
			// Create a new consumer for the new user
			consumer, err = authentication.NewConsumerExternal(tx, u.ID, consumerType, userInfo)
			if err != nil {
				return err
			}

			// For each account we want to create a local consumer too
			consumer, err = local.NewConsumer(tx, u.ID)
			if err != nil {
				return err
			}
		}

		// If a new user has been created and a first admin has been create,
		// let's init the builtin consumers from the magix token
		if signupDone && hasInitToken {
			if err := initBuiltinConsumersFromStartupConfig(tx, consumer, initToken); err != nil {
				return err
			}
		}

		// Generate a new session for consumer
		session, err := authentication.NewSession(tx, consumer, driver.GetSessionDuration())
		if err != nil {
			return err
		}

		// Generate a jwt for current session
		jwt, err := authentication.NewSessionJWT(session)
		if err != nil {
			return err
		}

		usr, err := user.LoadByID(ctx, tx, consumer.AuthentifiedUserID)
		if err != nil {
			return err
		}

		if err := tx.Commit(); err != nil {
			return sdk.WithStack(err)
		}

		// Set a cookie with the jwt token
		http.SetCookie(w, &http.Cookie{
			Name:    jwtCookieName,
			Value:   jwt,
			Expires: session.ExpireAt,
			Path:    "/",
		})

		// Prepare http response
		resp := sdk.AuthConsumerSigninResponse{
			Token: jwt,
			User:  usr,
		}

		return service.WriteJSON(w, resp, http.StatusOK)
	}
}

func (api *API) postAuthSignoutHandler() service.Handler {
	return func(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
		session := getAuthSession(ctx)

		if err := authentication.DeleteSessionByID(api.mustDB(), session.ID); err != nil {
			return err
		}

		// Delete the jwt cookie value
		http.SetCookie(w, &http.Cookie{
			Name:   jwtCookieName,
			Value:  "",
			MaxAge: -1,
			Path:   "/",
		})

		return service.WriteJSON(w, nil, http.StatusOK)
	}
}