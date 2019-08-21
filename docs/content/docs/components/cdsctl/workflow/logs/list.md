---
title: "list"
notitle: true
notoc: true
---
# cdsctl workflow logs list

`List logs from a workflow run`

## Synopsis

List logs from a workflow run. There on log file for each step.

	# list all logs files from projet KEY, with workflow named WD on latest run
	$ cdsctl workflow logs list KEY WF

	# list all logs files from projet KEY, with workflow named WD on run 1
	$ cdsctl workflow logs list KEY WF 1



```
cdsctl workflow logs list [ PROJECT-KEY WORKFLOW-NAME ] [RUN-NUMBER]
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl workflow logs](/docs/components/cdsctl/workflow/logs/)	 - `Manage CDS Workflow Run Logs`

