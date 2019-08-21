---
title: "push"
notitle: true
notoc: true
---
# cdsctl template push

`Push CDS workflow template`

## Synopsis

`Push CDS workflow template`

```
cdsctl template push YAML-FILE ... [flags]
```

## Examples

```
cdsctl template push my-template.yml workflow.yml 1.pipeline.yml
```

## Options

```
      --skip-update-files   Useful if you don't want to update yaml files after pushing the template.
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl template](/docs/components/cdsctl/template/)	 - `Manage CDS workflow template`

