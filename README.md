## Getting started with mijnservices-components

[![Storybook — Web Components](https://img.shields.io/badge/storybook-web_components-FF4785.svg?logo=storybook)](https://maykinmedia.github.io/mijnservices-components) [![Storybook — React](https://img.shields.io/badge/storybook-react-FF4785.svg?logo=storybook)](https://maykinmedia.github.io/mijnservices-components/react)

Work in Progress: experimental MijnServices components based on the NL Design System architecture.

### Packages

| Package                                                                                        | Version                                                                                                                               | Type          | Storybook                                                                                                 |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| [`@mijnservices/plan-card`](https://www.npmjs.com/package/@mijnservices/plan-card)             | [![npm](https://img.shields.io/npm/v/@mijnservices/plan-card.svg)](https://www.npmjs.com/package/@mijnservices/plan-card)             | Web Component | [Docs](https://maykinmedia.github.io/mijnservices-components/?path=/docs/components-plancard--docs)       |
| [`@mijnservices/section-wrapper`](https://www.npmjs.com/package/@mijnservices/section-wrapper) | [![npm](https://img.shields.io/npm/v/@mijnservices/section-wrapper.svg)](https://www.npmjs.com/package/@mijnservices/section-wrapper) | Web Component | [Docs](https://maykinmedia.github.io/mijnservices-components/?path=/docs/components-sectionwrapper--docs) |
| [`@mijnservices/card-as-link`](https://www.npmjs.com/package/@mijnservices/card-as-link)       | [![npm](https://img.shields.io/npm/v/@mijnservices/card-as-link.svg)](https://www.npmjs.com/package/@mijnservices/card-as-link)       | React         | [Docs](https://maykinmedia.github.io/mijnservices-components/react/?path=/docs/react-cardaslink--docs)    |

```bash
pnpm install
```

## Building

Build all components at once:

```bash
pnpm build
```

Build an individual component:

```bash
pnpm --filter @mijnservices/plan-card build
```

Each component builds to its own `dist/` folder with:

- `dist/index.js` - the web component
- `dist/{component}.react.js` - the React wrapper
- `dist/{component}.css` - the CSS, separately importable without the web component

## Storybook

View all components live at [maykinmedia.github.io/mijnservices-components](https://maykinmedia.github.io/mijnservices-components).

Run Storybook locally:

```bash
pnpm storybook
```

## Consuming components

Each component is published individually to npm. See each package's own README for full usage:

- [`@mijnservices/plan-card`](./components/plan-card/README.md) - [npm](https://www.npmjs.com/package/@mijnservices/plan-card)
- [`@mijnservices/section-wrapper`](./components/section-wrapper/README.md) - [npm](https://www.npmjs.com/package/@mijnservices/section-wrapper)

All components follow the same three consumption patterns: as a web component, as a React wrapper, or as CSS-only classes for your own markup.

## Architecture

### Structure

This is a pnpm monorepo. Each component lives in its own package under `components/` and is published separately to npm.

```
mijnservices-components/
├── components/
│   └── plan-card/     → @mijnservices/plan-card
├── .storybook/        → Storybook configuration
├── pnpm-workspace.yaml
└── package.json
```

### Lit

Components under `components/` (not `components/react/`) are built with [Lit](https://lit.dev), a lightweight library for web components. Lit is a dependency of each component package, not of the monorepo root. Consuming a component does not require Lit, React, or any particular framework - every component compiles down to a standard Custom Element (`customElements.define(...)`), usable from plain HTML, React, Vue, Angular, or Svelte alike. The `/react` export exists specifically to smooth over known gaps in how React (pre-19) handles custom element properties and events; other frameworks can consume the custom element directly without a wrapper.

### Shadow DOM

All Lit components use Shadow DOM (the Lit default). This means component styles are fully isolated and cannot be overridden with external CSS selectors. Theming is done exclusively via CSS custom properties (design tokens), for example `--mijnservices-plan-card-background-color`.

### React wrapper

The React 'simple wrapper' variant of a Lit component is generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/), which wraps the web component in a type-safe React component. React itself is a peer dependency - consumers provide their own React installation.

### React (native)

Components under `components/react/` are plain React components - no Lit, no custom element registration, no Shadow DOM. This is a deliberate second pattern alongside the web-component packages, for cases where a native React implementation is preferable (e.g. easier ref forwarding, no custom-element hydration quirks in frameworks like Next.js). React and ReactDOM are peer dependencies, same as the wrapped Lit components.

Because there's no Shadow DOM, styling is scoped by class name convention rather than by the browser - each component ships plain CSS classes (`.mijnservices-{component}`, `.mijnservices-{component}__title`, etc.) following [BEM](https://nldesignsystem.nl/handboek/developer/css-conventie/), themed via the same CSS custom property pattern as the Lit components (`--mijnservices-{component}-{property}`). All positioning and spacing properties use CSS logical properties (`inline-size`, `inset-block-start`, `padding-inline-end`, etc.) rather than physical ones, so consumers can safely apply their own RTL/LTR-aware themes.

### CSS and SCSS

Each Lit component ships:

- `_mixin.scss` - SCSS mixins that can be applied to any selector, including Shadow DOM (`:host`)
- `index.scss` - ready-to-use CSS classes (`.mijnservices-{component}`, `.mijnservices-{component}__heading` etc.)

React components ship a single `index.scss` with the same class and token conventions, without the `:host`-oriented mixin (not applicable outside Shadow DOM).

This follows the [NL Design System CSS conventions](https://nldesignsystem.nl/handboek/developer/css-conventie/).

### Design tokens

Each component ships a `tokens.json` with metadata about its design tokens, following the [NL Design System design token conventions](https://nldesignsystem.nl/handboek/developer/design-token-conventie/). The file contains no `$value` - only `$type` and `$extensions`, so consumers can apply their own theme.

Tokens follow the pattern `--mijnservices-{component}-{property}`, for example:

```css
--mijnservices-plan-card-background-color
--mijnservices-section-wrapper-heading-font-size
--mijnservices-card-as-link-decoration-folder-hover-background-color
```

### Vite

Each component has its own `vite.config.ts` for building. Vite is a build tool - it is not shipped to consumers. For Lit components, the config builds both the web component and the React wrapper as separate ES module entry points, with Lit and React marked as external dependencies. For React components, the config builds a single ES module + CommonJS entry point, with React and ReactDOM marked as external dependencies.

## Versioning and releasing

This repo uses [Changesets](https://github.com/changesets/changesets) to manage independent versioning per package.

After making a change to a component, run locally:

```bash
pnpm changeset
```

This will show an interactive terminal where you can select the canhged components with `ENTER1` and skip the 'major' release if not needed and just select the 'minor' release.

Commit the generated file under `.changeset/` alongside your change.

To start a component release, run `pnpm changeset version` to apply pending changesets (this bumps each affected package's `package.json` and writes its `CHANGELOG.md`), commit the result, then push any git tag to `main`. The tag itself doesn't need to match any package's version - it's only a trigger for CI, which attempts to publish every package under `components/*/` and `components/react/*/`, and skips any whose current version is already live on npm.

A brand-new package's first publish needs to always be done manually (`npm publish --access public` from the package folder) with an npm account that has org access, since npm's Trusted Publishing (OIDC, used by CI) can only be configured for a package that already exists on the registry. Once that first publish is done and a Trusted Publisher is registered on npmjs.com for the package, subsequent releases go through CI automatically via `pnpm changeset` + a git tag.

## Contribute

Use `pnpm format` to run Prettier before committing.
