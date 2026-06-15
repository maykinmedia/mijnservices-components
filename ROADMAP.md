# Roadmap

## Publiceren

- **Storybook op GitHub Pages** — gratis via GitHub Actions, URL wellicht `maykinmedia.github.io/mijnservices-components`. Toont alle componenten publiek zonder dat iemand de repo hoeft te clonen.
- **npm publiceren** — via Maykin Media npm organisatie met npm tokens in GitHub Actions. Zodat consumers `npm install  @mijnservices/plan-card` kunnen doen.

## Nieuwe packages

- **`@mijnservices/tokens`** — gedeelde design tokens als apart npm package, toe te voegen zodra er een tweede component bij komt. Voorkomt dat kleuren en spacing per component herhaald worden. Consumers kunnen dan één tokens package installeren en alle componenten krijgen automatisch de juiste waarden.

## Per component nog uitbreiden

- **`plan-card.test.ts`** — unit tests? met Vitest om te controleren dat de component correct rendert, properties werken, en de slot gevuld kan worden.
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
