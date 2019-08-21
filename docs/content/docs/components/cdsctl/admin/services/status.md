---
title: "status"
notitle: true
notoc: true
---
# cdsctl admin services status

`Status CDS services`

## Synopsis

`Status CDS services`

```
cdsctl admin services status [flags]
```

## Options

```
      --fields string   Only display specified object fields. 'empty' will display all fields, 'all' will display all object fields, 'field1,field2' to select multiple fields
      --filter string   Filter output based on conditions provided
      --format string   Output format: table|json|yaml (default "table")
      --name string     Filter service by name
  -q, --quiet           Only display object's key
  -t, --type string     Filter service by type: api, hatchery, hook, repository, vcs
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl admin services](/docs/components/cdsctl/admin/services/)	 - `Manage CDS services`

