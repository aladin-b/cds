---
title: "list"
notitle: true
notoc: true
---
# cdsctl token list

`List tokens from group`

## Synopsis


You can list tokens linked to a groups to know the id of a token to delete it or know the creator of this token.

Pay attention, if you mention a group, you must be an administrator of the group to launch this command
	

```
cdsctl token list [GROUPNAME] [flags]
```

## Options

```
      --fields string   Only display specified object fields. 'empty' will display all fields, 'all' will display all object fields, 'field1,field2' to select multiple fields
      --filter string   Filter output based on conditions provided
      --format string   Output format: table|json|yaml (default "table")
  -q, --quiet           Only display object's key
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl token](/docs/components/cdsctl/token/)	 - `Manage CDS group token`

