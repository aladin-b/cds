---
title: "export"
notitle: true
notoc: true
---
# cdsctl project integration export

`Export a integration configuration from a project to stdout`

## Synopsis

`Export a integration configuration from a project to stdout`

```
cdsctl project integration export [ PROJECT-KEY ] NAME
```

## Examples

```
cdsctl integration export MY-PROJECT MY-INTEGRATION-NAME > file.yaml
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl project integration](/docs/components/cdsctl/project/integration/)	 - `Manage CDS integrations`

