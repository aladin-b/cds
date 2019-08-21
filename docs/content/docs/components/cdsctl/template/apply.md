---
title: "apply"
notitle: true
notoc: true
---
# cdsctl template apply

`Apply CDS workflow template`

## Synopsis

`Apply CDS workflow template`

```
cdsctl template apply [ PROJECT-KEY WORKFLOW-NAME ] [TEMPLATE-PATH] [flags]
```

## Examples

```
cdsctl template apply project-key workflow-name group-name/template-slug
```

## Options

```
      --detach               Set to generate a workflow detached from the template
      --force                Force, may override files
      --import-as-code       If true, will import the generated workflow as code on given project
      --import-push          If true, will push the generated workflow on given project
  -n, --no-interactive       Set to not ask interactively for params
  -d, --output-dir string    Output directory (default ".cds")
  -p, --params stringArray   Specify params for template like --params paramKey:paramValue
      --quiet                If true, do not output filename created
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl template](/docs/components/cdsctl/template/)	 - `Manage CDS workflow template`

