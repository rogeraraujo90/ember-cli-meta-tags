# How To Contribute

This repository is a pnpm monorepo:

- `addon/` — the published `ember-cli-meta-tags` v2 addon
- `test-app/` — the Vite + Embroider app used for development and tests

## Installation

- `git clone <repository-url>`
- `cd ember-cli-meta-tags`
- `pnpm install`

## Linting

Lint the addon:

```
pnpm --filter ember-cli-meta-tags lint
pnpm --filter ember-cli-meta-tags lint:fix
```

Lint the test app:

```
pnpm --filter test-app lint
pnpm --filter test-app lint:fix
```

## Running tests

From `test-app/` (or with `--filter test-app`):

- `pnpm test` / `pnpm test:ember` — Runs the test suite on the current Ember version
- `pnpm test:ember-compatibility` — Runs the test suite against multiple Ember versions (see `test-app/config/ember-try.js`)

## Running the test application

- `pnpm --filter test-app start`
- Visit the app at [http://localhost:4200](http://localhost:4200).

## Building the addon

- `pnpm --filter ember-cli-meta-tags build`

The addon also builds automatically on `prepare` / `prepublishOnly`.

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
