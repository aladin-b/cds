---
title: "import"
notitle: true
notoc: true
---
# cdsctl workflow import

`Import a workflow`

## Synopsis


In case you want to import just your workflow. Instead of use a local file you can also use an URL to your yaml file.

If you want to update also dependencies likes pipelines, applications or environments at same time you have to use workflow push instead workflow import.

	

```
cdsctl workflow import [ PROJECT-KEY ] PATH [flags]
```

## Options

```
      --force   Override workflow if exists
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl workflow](/docs/components/cdsctl/workflow/)	 - `Manage CDS workflow`

