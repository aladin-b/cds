---
title: "run"
notitle: true
notoc: true
---
# cdsctl workflow run

`Run a CDS workflow`

## Synopsis

`Run a CDS workflow`

```
cdsctl workflow run [ PROJECT-KEY WORKFLOW-NAME ] [flags]
```

## Options

```
  -d, --data string         Run the workflow with payload data
  -i, --interactive         Follow the workflow run in an interactive terminal user interface
      --node-name string    Node Name to relaunch; Flag run-number is mandatory
  -o, --open-web-browser    Open web browser on the workflow run
  -p, --parameter strings   Run the workflow with pipeline parameter
      --run-number string   Existing Workflow RUN Number
  -s, --sync                Synchronise your pipelines with your last editions. Must be used with flag run-number
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl workflow](/docs/components/cdsctl/workflow/)	 - `Manage CDS workflow`

