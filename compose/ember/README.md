# Ember frontend (compose/ember)

This folder contains the Ember-based frontend generated with `ember-cli` and a simple `Dockerfile` + `nginx.conf` to build and serve the production build via Nginx.

Quick local build

```bash
cd compose/ember
# ensure Node 20.x is active (nvm use 20.19)
npm ci --no-audit --no-fund || npm install --no-audit --no-fund
# build a production dist
EMBER_ENV=production npm run build
```

Build docker image and run (build happens in container) 

```bash
docker compose build frontend
docker compose up -d frontend
```

Build docker image and run (optional: build dist locally and use prebuilt dist)

```bash
# build locally and then build a minimal nginx image
npm ci --no-audit --no-fund || npm install --no-audit --no-fund
EMBER_ENV=production npm run build
docker compose build frontend
docker compose up -d frontend
```

Notes

- Node >= 20 is required to run the Ember CLI (nvm recommended).
- The Nginx proxy forwards `/emails` to `host.docker.internal:8080/emails`. Adjust if your backend runs elsewhere.
- If you experience native Rollup module build errors in Docker (Apple Silicon/ARM / musl), the Docker image attempts to make a best-effort to install an x64 rollup optional binary. If you still have issues, build locally or use platform emulation (`docker buildx`).

UX & Accessibility

- The UI includes a theme switcher (light/dark), an accessible snackbar for messages, and inline form validation. The app uses progressive enhancement and semantic labels to make the form accessible.
# Ember frontend (compose/ember)

This folder contains the Ember-based frontend generated with `ember-cli` and a simple `Dockerfile` + `nginx.conf` to build and serve the production build via Nginx.

Quick local build

```bash
cd compose/ember
# ensure Node 20.x is active (nvm use 20.19)
npm install
EMBER_ENV=production npm run build
```

Build docker image and run

```bash
docker compose build frontend
docker compose up -d frontend
```

Notes

- The Nginx proxy forwards `/emails` to `host.docker.internal:8080/emails`. Adjust if your backend runs elsewhere.
- If your system uses `yarn` by default, `npm install` still works; the project scaffolder may initially install via `yarn`.
# email-frontend

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd email-frontend`
- `yarn install`

## Running / Development

- `yarn start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `yarn ember help generate` for more details

### Running Tests

- `yarn test`

### Linting

- `yarn lint`
- `yarn lint:fix`

### Building

- `yarn vite build --mode development` (development)
- `yarn build` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [Vite](https://vite.dev)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
