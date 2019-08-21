---
title: "pull"
notitle: true
notoc: true
---
# worker cache pull

`worker cache pull tagValue`

## Synopsis


Inside a project, you can fetch a cache from your worker with a tag

	worker cache pull <tagValue>

If you push a cache with:

	worker cache push latest {{.cds.workspace}}/pathToUpload

The command:

	worker cache pull latest

will create the directory {{.cds.workspace}}/pathToUpload with the content of the cache

If you want to push a cache into a storage integration:

	worker cache push latest --from=MyStorageIntegration {{.cds.workspace}}/pathToUpload

		

```
worker cache pull [flags]
```

## Options

```
      --from string   optional. Your storage integration name
```

## SEE ALSO

* [worker cache](/docs/components/worker/cache/)	 - 

