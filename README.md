<table>
        <tr>
            <td><img width="120" src="https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/rocket.svg" alt="onboarding" /></td>
            <td><strong>Archived Repository</strong><br />
            The code of this repository was written during a <a href="https://marmelab.com/blog/2018/09/05/agile-integration.html">Marmelab agile integration</a>. <a href="https://marmelab.com/blog/2018/02/07/jeu-du-taquin-en-react.html">The associated blog post</a> illustrates the efforts of the new hiree, who had to implement a board game in several languages and platforms as part of his initial learning.<br />
        <strong>This code is not intended to be used in production, and is not maintained.</strong>
        </td>
        </tr>
</table>

# 15-puzzle-isomorphic

A react app to play the 15 puzzle game.

> See the [related article](https://marmelab.com/blog/2018/02/07/jeu-du-taquin-en-react.html) on the Marmelab blog

## Requirements

Make sure to have `nodejs`, `npm` and `android` installed.

## Help

Print all available commands

```bash
make
```

## Build

Build the docker

```bash
make install
```

## Run the game

### Start

Run the 15-puzzle game on port 3000

```bash
make run
```

_Note: change the default port by using the `PORT` env variable._

```bash
PORT=3001 make run
```

You can use the `start` alias aswell.

```bash
make start
```

### Start in livereload mode

```bash
make dev
```

## Contributing

### Test

Launch the unit and integration tests

```bash
make test
```

_Note: you can update the snapshots by using the `UPDATE` env variable._

```bash
UPDATE=true make test
```

### Linter

Launch eslint

```bash
make lint
```

Launch autofix

```bash
make format
```
