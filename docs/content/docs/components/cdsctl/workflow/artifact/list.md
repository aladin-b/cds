---
title: "list"
notitle: true
notoc: true
---
# cdsctl workflow artifact list

`List artifacts of one Workflow Run`

## Synopsis

`List artifacts of one Workflow Run`

```
cdsctl workflow artifact list [ PROJECT-KEY WORKFLOW-NAME ] NUMBER [flags]
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

* [cdsctl workflow artifact](/docs/components/cdsctl/workflow/artifact/)	 - `Manage Workflow Artifact`

