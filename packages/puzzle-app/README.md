# App (part of 15-puzzle)

A react isomorphic app to play the 15 puzzle game.

## Requirements

Make sure to have `npm` and `yarn` installed.

## Help

Print all available commands

``` bash
make
```

## Run the project

### Start the app

Run the 15-puzzle game on port 3000

``` bash
make run
```

Note:

- change the default port by using the `PORT` env variable.

``` bash
PORT=3001 make run
```

You can use the `start` alias aswell.

``` bash
make start
```

### Start the app in livereload mode

``` bash
make dev
```

## Contributing

### Install the dependencies

Install the dependencies

``` bash
make install
```

## Build the library

Build the app

``` bash
make build
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
