---
title: "delete"
notitle: true
notoc: true
---
# cdsctl token delete

`Delete a token linked to a group`

## Synopsis


Delete a token from a group and so revoke it to unauthorize future connection.

Pay attention you must be an administrator of the group to launch this command.
	

```
cdsctl token delete GROUPNAME TOKENID [flags]
```

## Options

```
      --force   Force delete without confirmation and exit 0 if resource does not exist
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl token](/docs/components/cdsctl/token/)	 - `Manage CDS group token`

