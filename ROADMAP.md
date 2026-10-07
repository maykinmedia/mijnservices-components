# Roadmap

## Publiceren

- **Storybook op GitHub Pages** ✅ — live op [maykinmedia.github.io/mijnservices-components](https://maykinmedia.github.io/mijnservices-components) via GitHub Actions.
- **npm publiceren** ✅ — onder maykinmedia via de `@mijnservices` npm organisatie met trusted publishing via GitHub Actions. Consumers kunnen `npm install @mijnservices/plan-card` doen.
- **Changesets** — opzetten van [`@changesets/cli`](https://github.com/changesets/changesets) voor geautomatiseerd versiebeheer in de monorepo. Hiermee krijgt elk component zijn eigen versietag (bijv. `@mijnservices/plan-card@0.2.0`) en worden alleen gewijzigde packages gepubliceerd bij een release.

## Nieuwe packages

- **`@mijnservices/tokens`** — gedeelde design tokens als apart npm package, toe te voegen zodra er een tweede component bij komt. Voorkomt dat kleuren en spacing per component herhaald worden. Consumers kunnen dan één tokens package installeren en alle componenten krijgen automatisch de juiste waarden.

## Per component nog uitbreiden

- **`plan-card.test.ts`** — unit tests met Vitest om te controleren dat de component correct rendert, properties werken, en de slot gevuld kan worden.
- **`plan-card.mdx`** — documentatie in Markdown naast de stories, zoals Utrecht dat doet: wanneer gebruik je de component, wanneer niet, toegankelijkheidsnoten, en voorbeelden.
- **Slots uitbreiden** — naarmate gebruikers meer flexibiliteit nodig hebben (badge, status, avatar, extra knop) slots toevoegen in plaats van nieuwe properties.

## Nieuwe componenten

Zelfde structuur als `plan-card` herhalen voor elk nieuw component:

```
components/
└── your-component/
    ├── src/
    │   ├── your-component.ts
    │   ├── your-component.react.tsx
    │   ├── your-component.stories.ts
    │   ├── your-component.tokens.stories.ts
    │   ├── _mixin.scss
    │   ├── index.scss
    │   ├── index.ts
    │   └── scss.d.ts
    ├── tokens.json
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Maintenance

Let op 'npm audit fix', storybook updates, vite updates + bijwerken van de Dicussions op https://github.com/orgs/nl-design-system/discussions/categories/mijn-omgevingen

## Vite

Vite heeft twee rollen in dit project:

1. Bouwen van de component packages

Elk component heeft een vite.config.ts die de bronbestanden (src/) omzet naar een dist/ map die op npmjs gepubliceerd wordt. Vite bundelt de TypeScript, laadt de SCSS via ?inline in, en genereert losse entry points voor de web component, React wrapper en CSS.

2. Storybook

@storybook/web-components-vite gebruikt Vite als builder voor de Storybook dev server en de gebouwde Storybook. Storybook 10 heeft een bundler nodig en Vite is de snelste optie. (Rollup alleen onder de motorkap, geen esbuild).

## React toevoegen

Om deze repositiry als werkend voorbeeld te laten dienen, voegen we React toe zodat er ook daadwerkelijke React componenten gebouwd kunnen worden (niet allee nals wrapper).

Gedaan:

## Background

Until now, the `mijnservices-components` monorepo only contained Lit web components (`plan-card`, `section-wrapper`). The goal was to add a native React component alongside them: a rebuild of the Den Haag `CaseCard`, improved with an `eyebrow` paragraph and the option to render the title as either a semantic heading or a plain paragraph (`headingLevel`).

## What was done

- **Structure:** a separate `components/react/` folder next to the web components, with `pnpm-workspace.yaml` extended to include `components/react/*`.
- **Tooling:** a dedicated tsconfig, Vite 8 with `@vitejs/plugin-react` v6, and a second, standalone React Storybook (`.storybook-react/`) linked to the web components Storybook through composition.
- **Styling:** the Den Haag SCSS was adopted, but using only logical properties and `--mijnservices-*` tokens. The hover animation was removed and replaced with hover and active color tokens.
- **Rename and release:** the component was renamed from `case-card` to `card-as-link`, the CI publish step was updated to handle nested packages, and the README was expanded.
- **First publish:** published to npm via Trusted Publishing. The last step was pushing the `0.1.6` tag.


