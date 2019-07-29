import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { finalize, first } from 'rxjs/operators';
import { Group } from '../../../../model/group.model';
import { Token, TokenEvent } from '../../../../model/token.model';
import { User } from '../../../../model/user.model';
import { AuthentificationStore } from '../../../../service/auth/authentification.store';
import { GroupService } from '../../../../service/group/group.service';
import { UserService } from '../../../../service/user/user.service';
import { PathItem } from '../../../../shared/breadcrumb/breadcrumb.component';
import { ToastService } from '../../../../shared/toast/ToastService';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user.edit.html',
    styleUrls: ['./user.edit.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit {
    loading = false;
    deleteLoading = false;
    tokensLoading = true;
    user: User;
    currentUser: User;
    groups: Array<Group>;
    groupsAdmin: Array<Group>;
    tokens: Array<Token>;
    private username: string;
    private usernamePattern: RegExp = new RegExp('^[a-zA-Z0-9._-]{1,}$');
    userPatternError = false;
    path: Array<PathItem>;

    constructor(
        private _userService: UserService,
        private _toast: ToastService, private _translate: TranslateService,
        private _route: ActivatedRoute, private _router: Router,
        private _authentificationStore: AuthentificationStore,
        private _groupService: GroupService, private _cd: ChangeDetectorRef
    ) {
        this.currentUser = this._authentificationStore.getUser();
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.username = params['username'];

            if (this.username === this.currentUser.username) {
                this.tokensLoading = true;
                this._userService.getTokens()
                    .pipe(finalize(() => {
                        this.tokensLoading = false;
                        this._cd.markForCheck();
                    }))
                    .subscribe((tokens) => this.tokens = tokens);
            }

            this._userService.getUser(this.username).subscribe(u => {
                this.user = u;
                this.username = this.user.username;
                this.groups = [];

                this._userService.getGroups(this.user.username).subscribe(g => {
                    this.groupsAdmin = g.groups_admin;
                    for (let i = 0; i < g.groups.length; i++) {
                        let userAdminOnGroup = false;
                        for (let j = 0; j < this.groupsAdmin.length; j++) {
                            if (this.groupsAdmin[j].name === g.groups[i].name) {
                                userAdminOnGroup = true;
                                break;
                            }
                        }
                        if (!userAdminOnGroup) {
                            this.groups.push(g.groups[i]);
                        }
                    }
                    this._cd.markForCheck();
                });

                this.updatePath();
                this._cd.markForCheck();
            });
        });
    }

    clickDeleteButton(): void {
        this.deleteLoading = true;
        this._userService.deleteUser(this.user.username)
            .pipe(finalize(() => {
                this.deleteLoading = false;
                this._cd.markForCheck();
            }))
            .subscribe(() => {
            this._toast.success('', this._translate.instant('user_deleted'));
            this._router.navigate(['../'], { relativeTo: this._route });
        });
    }

    clickSaveButton(): void {
        if (!this.user.username) {
            return;
        }

        if (!this.usernamePattern.test(this.user.username)) {
            this.userPatternError = true;
            return;
        }

        this.loading = true;
        if (this.user.id > 0) {
            this._userService.updateUser(this.username, this.user)
                .pipe(finalize(() => {
                    this.loading = false;
                    this._cd.markForCheck();
                }))
                .subscribe(wm => {
                this._toast.success('', this._translate.instant('user_saved'));
                this._router.navigate(['/settings', 'user', this.user.username], { relativeTo: this._route });
            });
        }

    }

    tokenEvent(event: TokenEvent): void {
        if (!event) {
            return;
        }
        switch (event.type) {
            case 'delete':
                this._groupService.removeToken(event.token.group_name, event.token.id)
                    .pipe(
                        first(),
                        finalize(() => {
                            event.token.updating = false;
                            this._cd.markForCheck();
                        })
                    )
                    .subscribe(() => {
                        this.tokens = this.tokens.filter((token) => token.id !== event.token.id);
                        this._toast.success('', this._translate.instant('token_deleted'));
                    });
                break;
            case 'add':
                this._groupService.addToken(event.token.group_name, event.token.expirationString, event.token.description)
                    .pipe(
                        first(),
                        finalize(() => {
                            event.token.expirationString = null;
                            event.token.description = null;
                            event.token.updating = false;
                            this._cd.markForCheck();
                        })
                    )
                    .subscribe((token) => {
                        if (!Array.isArray(this.tokens)) {
                            this.tokens = [token];
                        } else {
                            this.tokens.push(token);
                        }
                        this._toast.success('', this._translate.instant('token_added'));
                    });
                break;
        }
    }

    updatePath() {
        this.path = [<PathItem>{
            translate: 'common_settings'
        }, <PathItem>{
            translate: 'user_list_title',
            routerLink: ['/', 'settings', 'user']
        }];

        if (this.user && this.user.id) {
            this.path.push(<PathItem>{
                text: this.user.username,
                routerLink: ['/', 'settings', 'user', this.user.username]
            });
        }
    }
}
