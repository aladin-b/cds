---
title: "bulk"
notitle: true
notoc: true
---
# cdsctl template bulk

`Bulk apply CDS workflow template and push all given workflows`

## Synopsis

`Bulk apply CDS workflow template and push all given workflows`

```
cdsctl template bulk [TEMPLATE-PATH] [flags]
```

## Examples

```
cdsctl template bulk group-name/template-slug -i PROJ1/workflow1 -i PROJ1/workflow2 -p PROJ1/workflow1:repo=github.com/ovh/cds
```

## Options

```
      --detach stringArray      Set to generate a workflow detached from the template like --detach PROJ1/workflow1
  -i, --instances stringArray   Specify instances path
      --instances-file string   Specify path|url of a json|yaml file that contains instances with params
  -n, --no-interactive          Set to not ask interactively for params
  -p, --params stringArray      Specify parameters for template like --params PROJ1/workflow1:paramKey=paramValue
      --track                   Wait the bulk to be over
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl template](/docs/components/cdsctl/template/)	 - `Manage CDS workflow template`

