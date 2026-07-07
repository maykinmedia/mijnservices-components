# @mijnservices/plan-card

[![npm](https://img.shields.io/npm/v/@mijnservices/plan-card)](https://www.npmjs.com/package/@mijnservices/plan-card)

A fully clickable card component for linking to a plan, goal, or similarly structured piece of content. Part of [mijnservices-components](https://github.com/maykinmedia/mijnservices-components), built on NL Design System architecture.

Framework-agnostic: this ships as a standard Custom Element, so it works in plain HTML, React, Vue, Angular, or Svelte alike. A dedicated React wrapper is also included for a more idiomatic React experience.

## Install

```bash
npm install @mijnservices/plan-card
```

## Usage

### Web component

```js
import "@mijnservices/plan-card";
```

```html
<mijnservices-plan-card href="/plannen/zelfstandig-wonen" date="Nog 2 dagen" date-time="2026-07-08">
  <span slot="domain">Wonen</span>
  <span slot="heading">Zelfstandig gaan wonen</span>
  <p>Voeg uw energiecontract toe voordat u verhuist.</p>
</mijnservices-plan-card>
```

### React

```tsx
import { PlanCard } from "@mijnservices/plan-card/react";

<PlanCard href="/plannen/zelfstandig-wonen" date="Nog 2 dagen" dateTime="2026-07-08">
  <span slot="domain">Wonen</span>
  <span slot="heading">Zelfstandig gaan wonen</span>
  <p>Voeg uw energiecontract toe voordat u verhuist.</p>
</PlanCard>;
```

### CSS only

If you want to use your own markup with the component's styles:

```js
import "@mijnservices/plan-card/css";
```

```html
<div class="mijnservices-plan-card">
  <p class="mijnservices-plan-card__domain">Wonen</p>
  <p class="mijnservices-plan-card__heading">Zelfstandig gaan wonen</p>
</div>
```

## Props / attributes

| Attribute    | Type                   | Default     | Description                                                                |
| ------------ | ---------------------- | ----------- | -------------------------------------------------------------------------- |
| `href`       | `string`               | `''`        | Destination link. The entire card becomes clickable, not just the arrow.   |
| `aria-label` | `string`               | `''`        | Accessible label for the card's link. See accessibility note below.        |
| `date`       | `string`               | `''`        | Visible date/deadline text, e.g. `"Nog 2 dagen"`.                          |
| `date-time`  | `string`               | `''`        | Machine-readable ISO date passed to the underlying `<time datetime>`.      |
| `appearance` | `'default' \| 'plain'` | `'default'` | `plain` removes the card's background/clip decoration for a flatter style. |

## Slots

| Slot      | Purpose                                          |
| --------- | ------------------------------------------------ |
| `domain`  | Small label above the heading (e.g. a category). |
| `heading` | The card's title.                                |
| (default) | Body content below the heading.                  |

## Accessibility

The whole card surface is clickable — a stretched link sits behind the entire card, not just the visible arrow icon. Because of this:

- Always provide a specific `aria-label` describing the destination (e.g. `"Ga naar plan: Zelfstandig gaan wonen"`), rather than leaving it empty. Screen reader users navigating by links otherwise only hear a generic "link", with no indication of which plan it leads to.
- Don't rely on the visible arrow or heading text alone to convey the link's purpose — the `aria-label` is what assistive technology actually announces.

## Theming

This component uses Shadow DOM, so its styles are isolated and cannot be overridden with external CSS selectors. Theme it using CSS custom properties instead — see [`tokens.json`](./tokens.json) for the full list, or the component's Storybook "Design Tokens" page for a copy-pasteable template. All tokens follow the pattern `--mijnservices-plan-card-{property}`, for example:

```css
--mijnservices-plan-card-background-color
--mijnservices-plan-card-heading-font-size
```

## Documentation

Live examples and the full design token reference: [Storybook](https://maykinmedia.github.io/mijnservices-components/?path=/docs/components-plancard--docs)

## License

EUPL-1.2
