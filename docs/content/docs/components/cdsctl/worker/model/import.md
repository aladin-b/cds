---
title: "import"
notitle: true
notoc: true
---
# cdsctl worker model import



## Synopsis


Available model type :
- Docker images ("docker")
- Openstack image ("openstack")
- VSphere image ("vsphere")

For admin:
+ For each type of model you have to indicate the main worker command to run your workflow (example: worker)
+ For Openstack and VSphere model you can indicate a precmd and postcmd that will execute before and after the main worker command
	

```
cdsctl worker model import PATH ... [flags]
```

## Examples

```
cdsctl worker model import my_worker_model_file.yml https://mydomain.com/myworkermodel.yml
```

## Options

```
      --force   Use force flag to update your worker model
```

## Options inherited from parent commands

```
  -f, --file string   set configuration file
      --insecure      (SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers.
      --verbose       verbose output
```

## SEE ALSO

* [cdsctl worker model](/docs/components/cdsctl/worker/model/)	 - `Manage Worker Model`

