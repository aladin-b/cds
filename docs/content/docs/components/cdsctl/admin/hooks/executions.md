---
title: "executions"
notitle: true
notoc: true
---
# cdsctl admin hooks executions

`List CDS Executions for one task`

## Synopsis

`List CDS Executions for one task`

```
cdsctl admin hooks executions UUID [flags]
```

## Examples

```
cdsctl admin hooks executions 5178ce1f-2f76-45c5-a203-58c10c3e2c73
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

* [cdsctl admin hooks](/docs/components/cdsctl/admin/hooks/)	 - `Manage CDS Hooks tasks`

