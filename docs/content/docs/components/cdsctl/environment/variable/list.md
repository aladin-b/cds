---
title: "list"
notitle: true
notoc: true
---
# cdsctl environment variable list

`List CDS environment variables`

## Synopsis

`List CDS environment variables`

```
cdsctl environment variable list [ PROJECT-KEY ] ENV-NAME [flags]
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

* [cdsctl environment variable](/docs/components/cdsctl/environment/variable/)	 - `Manage CDS environment variables`

