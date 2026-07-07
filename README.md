## Getting started with mijnservices-components

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

Components are built with [Lit](https://lit.dev), a lightweight library for web components. Lit is a dependency of each component package, not of the monorepo root. Consuming a component does not require Lit, React, or any particular framework - every component compiles down to a standard Custom Element (`customElements.define(...)`), usable from plain HTML, React, Vue, Angular, or Svelte alike. The `/react` export exists specifically to smooth over known gaps in how React (pre-19) handles custom element properties and events; other frameworks can consume the custom element directly without a wrapper.

### Shadow DOM

All components use Shadow DOM (the Lit default). This means component styles are fully isolated and cannot be overridden with external CSS selectors. Theming is done exclusively via CSS custom properties (design tokens), for example `--mijnservices-plan-card-background-color`.

### React wrapper

The React variant is generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/), which wraps the web component in a type-safe React component. React itself is a peer dependency - consumers provide their own React installation.

### CSS and SCSS

Each component ships:

- `_mixin.scss` - SCSS mixins that can be applied to any selector, including Shadow DOM (`:host`)
- `index.scss` - ready-to-use CSS classes (`.mijnservices-{component}`, `.mijnservices-{component}__heading` etc.)

This follows the [NL Design System CSS conventions](https://nldesignsystem.nl/handboek/developer/css-conventie/).

### Design tokens

Each component ships a `tokens.json` with metadata about its design tokens, following the [NL Design System design token conventions](https://nldesignsystem.nl/handboek/developer/design-token-conventie/). The file contains no `$value` - only `$type` and `$extensions`, so consumers can apply their own theme.

Tokens follow the pattern `--mijnservices-{component}-{property}`, for example:

```css
--mijnservices-plan-card-background-color
--mijnservices-section-wrapper-heading-font-size
```

### Vite

Each component has its own `vite.config.ts` for building. Vite is a build tool - it is not shipped to consumers. The config builds both the web component and the React wrapper as separate ES module entry points, with Lit and React marked as external dependencies.

## Versioning and releasing

This repo uses [Changesets](https://github.com/changesets/changesets) to manage independent versioning per package.

After making a change to a component, run:

```bash
pnpm changeset
```

and commit the generated file under `.changeset/` alongside your change.

To cut a release, run `pnpm changeset version` to apply pending changesets (this bumps each affected package's `package.json` and writes its `CHANGELOG.md`), commit the result, then push any git tag to `main`. The tag itself doesn't need to match any package's version - it's only a trigger for CI, which attempts to publish every package under `components/*/` and skips any whose current version is already live on npm.

## Contribute

Use `pnpm format` to run Prettier before committing.
