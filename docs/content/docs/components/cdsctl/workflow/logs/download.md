---
title: "download"
notitle: true
notoc: true
---
# cdsctl workflow logs download

`Download logs from a workflow run.`

## Synopsis

Download logs from a workflow run. You can download all logs files or just one log if you want.

	# download all logs files on latest run
	$ cdsctl workflow logs download KEY WF

	# download all logs files on run number 1
	$ cdsctl workflow logs download KEY WF 1

	# download only one file:
	$ cdsctl workflow logs download KEY WF 1 --pattern="MyStage"
	# this will download WF-1.0-pipeline.myPipeline-stage.MyStage-job.MyJob-status.Success-step.0.log for example



```
cdsctl workflow logs download [ PROJECT-KEY WORKFLOW-NAME ] [RUN-NUMBER] [flags]
```

## Options

```
      --pattern string   Filter on log filename
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl workflow logs](/docs/components/cdsctl/workflow/logs/)	 - `Manage CDS Workflow Run Logs`

