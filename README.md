# mijnservices-components

[![Storybook](https://img.shields.io/badge/storybook-live-FF4785.svg?logo=storybook)](https://maykinmedia.github.io/mijnservices-components)

[NPMJS →](https://www.npmjs.com/package/@mijnservices/plan-card)

Work in Progress: MijnServices web components based on the NL Design System architecture.
This project is free and open-source software licensed under the European Union Public License (EUPL) v1.2.

## Structure

This is a pnpm monorepo. Each component lives in its own package under `components/` and is published separately to npm.

```
mijnservices-components/
├── components/
│   └── plan-card/     → @mijnservices/plan-card
├── .storybook/        → Storybook configuration
├── pnpm-workspace.yaml
└── package.json
```

## Getting started

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

- `dist/index.js` — the web component
- `dist/plan-card.react.js` — the React wrapper
- `dist/plan-card.css` — the CSS, separately importable without the web component

## Storybook

View all components live at [maykinmedia.github.io/mijnservices-components](https://maykinmedia.github.io/mijnservices-components).

Run Storybook locally:

```bash
pnpm storybook
```

## Consuming components

> Publishing to npm is planned. See [ROADMAP.md](./ROADMAP.md).

### Web component

```js
import "@mijnservices/plan-card";
```

```html
<mijnservices-plan-card heading="Plan naam" domain="Domein naam" href="/link"></mijnservices-plan-card>
```

### React

```tsx
import { PlanCard } from "@mijnservices/plan-card/react";

<PlanCard heading="Plan naam" domain="Domein naam" href="/link" />;
```

### CSS only

If you want to use your own HTML markup with our styles:

```js
import "@mijnservices/plan-card/css";
```

```html
<div class="mijnservices-plan-card">
  <p class="mijnservices-plan-card__domain">Domein naam</p>
  <p class="mijnservices-plan-card__heading">Plan naam</p>
</div>
```

## Architecture

### Lit

Components are built with [Lit](https://lit.dev), a lightweight library for web components. Lit is a dependency of each component package, not of the monorepo root.

### Shadow DOM

All components use Shadow DOM (the Lit default). This means component styles are fully isolated and cannot be overridden with external CSS selectors. Theming is done exclusively via CSS custom properties (design tokens), for example `--mijnservices-plan-card-background-color`.

### React wrapper

The React variant is generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/), which wraps the web component in a type-safe React component. React itself is a peer dependency — consumers provide their own React installation.

### CSS and SCSS

Each component ships:

- `_mixin.scss` — SCSS mixins that can be applied to any selector, including Shadow DOM (`:host`)
- `index.scss` — ready-to-use CSS classes (`.mijnservices-plan-card`, `.mijnservices-plan-card__heading` etc.)

This follows the [NL Design System CSS conventions](https://nldesignsystem.nl/handboek/developer/css-conventie/).

### Design tokens

Each component ships a `tokens.json` with metadata about its design tokens, following the [NL Design System design token conventions](https://nldesignsystem.nl/handboek/developer/design-token-conventie/). The file contains no `$value` — only `$type` and `$extensions`, so consumers can apply their own theme.

Tokens follow the pattern `--mijnservices-{component}-{property}`, for example:

```css
--mijnservices-plan-card-background-color
--mijnservices-plan-card-heading-font-size
```

### Vite

Each component has its own `vite.config.ts` for building. Vite is a build tool — it is not shipped to consumers. The config builds both the web component and the React wrapper as separate ES module entry points, with Lit and React marked as external dependencies.

## Contribute

Use `pnpm format` to run Prettier before committing.

Note: creating a Git tag for a specific component (e.g. `@mijnservices/plan-card@0.1.1`) will trigger the GitHub Action to publish that component to npm.
