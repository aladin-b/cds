---
title: "instances"
notitle: true
notoc: true
---
# cdsctl template instances

`Get instances for a CDS workflow template`

## Synopsis

`Get instances for a CDS workflow template`

```
cdsctl template instances [TEMPLATE-PATH] [flags]
```

## Examples

```
cdsctl template instances group-name/template-slug
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

* [cdsctl template](/docs/components/cdsctl/template/)	 - `Manage CDS workflow template`

