# 15-puzzle-isomorphic

A react app to play the 15 puzzle game.

## Requirements

Make sure to have `npm` installed.

## Contributing

### Help

Print all available commands

``` bash
make
```

### Test

Launch the unit and integration tests

``` bash
make test
```

Note:

- you can update the snapshots by using the `UPDATE` env variable.

``` bash
UPDATE=true make test
```

### Linter

Launch eslint

``` bash
make lint
```

## Run the project

### Start the app

Run the 15-puzzle game on port 3000

``` bash
make run
```

Note:

- change the default port by using the `PORT` env variable.
- use the non cache version using the `CACHE` env variable.

``` bash
PORT=3001 CACHE=false make run
```

You can use the `start` alias aswell.

``` bash
make start
```

### Start the app in livereload mode

``` bash
make dev
```
