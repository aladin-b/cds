---
title: "list"
notitle: true
notoc: true
---
# cdsctl worker model list

`List CDS worker models`

## Synopsis

`List CDS worker models`

```
cdsctl worker model list [flags]
```

## Options

```
  -b, --binary string   Use this flag to filter worker model list by its binary capabilities
      --fields string   Only display specified object fields. 'empty' will display all fields, 'all' will display all object fields, 'field1,field2' to select multiple fields
      --filter string   Filter output based on conditions provided
      --format string   Output format: table|json|yaml (default "table")
  -q, --quiet           Only display object's key
  -s, --state string    Use this flag to filter worker model by his state (disabled|error|register|deprecated)
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl worker model](/docs/components/cdsctl/worker/model/)	 - `Manage Worker Model`

