# @mijnservices/section-wrapper

[![npm](https://img.shields.io/npm/v/@mijnservices/section-wrapper)](https://www.npmjs.com/package/@mijnservices/section-wrapper)

A labelled section wrapper: an eyebrow label, a heading (optionally a link), and a slot for any content. Part of [mijnservices-components](https://github.com/maykinmedia/mijnservices-components), built on NL Design System architecture.

Unlike [`@mijnservices/plan-card`](https://www.npmjs.com/package/@mijnservices/plan-card), this component is **not** a fully clickable surface — only the heading itself becomes a link when `href` is set. Use this when you need a labelled group of arbitrary content (e.g. a list of related items), not a single clickable destination.

Framework-agnostic: this ships as a standard Custom Element, so it works in plain HTML, React, Vue, Angular, or Svelte alike. A dedicated React wrapper is also included for a more idiomatic React experience.

## Install

```bash
npm install @mijnservices/section-wrapper
```

## Usage

### Web component

```js
import "@mijnservices/section-wrapper";
```

```html
<mijnservices-section-wrapper
  heading="Zelfstandig gaan wonen"
  heading-level="3"
  eyebrow="Doel"
  href="/doelen/zelfstandig-wonen"
>
  <ul>
    <li>Voeg uw energiecontract toe</li>
    <li>Plan opsturen voor inrichten van kinderkamer</li>
  </ul>
</mijnservices-section-wrapper>
```

### React

```tsx
import { SectionWrapper } from "@mijnservices/section-wrapper/react";

<SectionWrapper heading="Zelfstandig gaan wonen" headingLevel={3} eyebrow="Doel" href="/doelen/zelfstandig-wonen">
  <ul>
    <li>Voeg uw energiecontract toe</li>
    <li>Plan opsturen voor inrichten van kinderkamer</li>
  </ul>
</SectionWrapper>;
```

### CSS only

If you want to use your own markup with the component's styles:

```js
import "@mijnservices/section-wrapper/css";
```

```html
<section class="mijnservices-section-wrapper">
  <hgroup class="mijnservices-section-wrapper__hgroup">
    <p class="mijnservices-section-wrapper__eyebrow">Doel</p>
    <h3 class="mijnservices-section-wrapper__heading">Zelfstandig gaan wonen</h3>
  </hgroup>
  <div class="mijnservices-section-wrapper__body">
    <ul>
      <li>Voeg uw energiecontract toe</li>
      <li>Plan opsturen voor inrichten van kinderkamer</li>
    </ul>
  </div>
</section>
```

Note the `__body` div: it's required, not optional. `<slot>` itself usually has no box display (it defaults to `display: contents`), making it incapable of holding padding — the 'body' wrapping div is what actually gets styled, so it's what the `body-padding-*` tokens below apply to.

## Props / attributes

| Attribute       | Type                         | Default | Description                                                                                   |
| --------------- | ---------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `heading`       | `string`                     | `''`    | Required. The section's heading text.                                                         |
| `heading-level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `2`     | Renders `<h1>`–`<h6>`. Choose based on the surrounding page outline, not styling.             |
| `eyebrow`       | `string`                     | `''`    | Optional label shown above the heading. Also used to derive the accessible label — see below. |
| `href`          | `string`                     | `''`    | Optional. When set, the heading text becomes a link. When unset, the heading is plain text.   |

## Slots

| Slot      | Purpose                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------- |
| (default) | Any content belonging to this section — a list, further components, etc. Not owned or wrapped by this component. |

There is only one slot. The eyebrow and heading are not slottable — they're controlled entirely through the `eyebrow`/`heading` attributes so the component can manage the accessible relationship between them correctly.

## Accessibility

The eyebrow and heading are wrapped in an `<hgroup>`, with an `aria-label` **automatically derived from the `eyebrow` attribute** — there is no separate prop to set this, and it can't be overridden. If `eyebrow` is empty, no `aria-label` is added at all.

`heading-level` is left entirely to you rather than hardcoded, since the correct level depends on where this component sits in your page's outline — this component won't guess that for you.

## Theming

This component uses Shadow DOM, so its styles are isolated and cannot be overridden with external CSS selectors. Theme it using CSS custom properties instead — see [`tokens.json`](./tokens.json) for the full list, or the component's Storybook "Design Tokens" page for a copy-pasteable template. All tokens follow the pattern `--mijnservices-section-wrapper-{property}`, for example:

```css
--mijnservices-section-wrapper-border-color
--mijnservices-section-wrapper-heading-font-size
```

**Header and body padding are independent.** There's no padding on the outer wrapper itself — only the header (`hgroup`) and body (the div wrapping your slotted content) have their own padding, controllable separately:

```css
--mijnservices-section-wrapper-header-padding-block-start
--mijnservices-section-wrapper-header-padding-block-end
--mijnservices-section-wrapper-header-padding-inline-start
--mijnservices-section-wrapper-header-padding-inline-end
--mijnservices-section-wrapper-body-padding-block-start
--mijnservices-section-wrapper-body-padding-block-end
--mijnservices-section-wrapper-body-padding-inline-start
--mijnservices-section-wrapper-body-padding-inline-end
```

## Documentation

Live examples and the full design token reference: [Storybook](https://maykinmedia.github.io/mijnservices-components/?path=/docs/components-sectionwrapper--docs)

## License

EUPL-1.2
