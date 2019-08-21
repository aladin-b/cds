---
title: "push"
notitle: true
notoc: true
---
# cdsctl workflow push

`Push a workflow`

## Synopsis


Useful when you want to push a workflow and his dependencies (pipelines, applications, environments)

For example if you have a workflow with pipelines build and tests you can push your workflow and pipelines with

	cdsctl workflow push tests.pip.yml build.pip.yml myWorkflow.yml

	

```
cdsctl workflow push [ PROJECT-KEY ] YAML-FILE ... [flags]
```

## Options

```
      --skip-update-files   Useful if you don't want to update yaml files after pushing the workflow.
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl workflow](/docs/components/cdsctl/workflow/)	 - `Manage CDS workflow`

