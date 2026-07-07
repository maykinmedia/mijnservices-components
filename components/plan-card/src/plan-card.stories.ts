import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './plan-card.js';

const meta: Meta = {
  title: 'Components/PlanCard',
  component: 'mijnservices-plan-card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A fully clickable card for linking to a plan, goal, or similarly structured piece of content.

**Framework-agnostic:** this renders as a standard Custom Element (\`<mijnservices-plan-card>\`), so it works in plain HTML, Vue, Angular, or Svelte without any wrapper. A dedicated React wrapper (\`@mijnservices/plan-card/react\`) is also published, since React (pre-19) doesn't reliably pass rich property values or bind custom DOM events to Custom Elements — the wrapper smooths that over so React consumers get an idiomatic component.

**Accessibility note:** the entire card surface will become clickable via a stretched link, not just the visible arrow icon. Always pass a specific \`aria-label\` describing the destination (e.g. "Ga naar plan: Zelfstandig gaan wonen") — without it, screen reader users only hear a generic "link" with no indication of where it leads.

**Theming:** this component uses Shadow DOM, so styles are isolated and can only be customized via CSS custom properties (design tokens) — see the "Design Tokens" page for the full list and a copy-pasteable template.
        `,
      },
    },
  },
  decorators: [(story) => html` <div style="max-inline-size: 360px; padding: 2rem;">${story()}</div> `],
  argTypes: {
    href: { control: 'text' },
    ariaLabel: { control: 'text' },
    date: { control: 'text' },
    dateTime: { control: 'text' },
    appearance: {
      control: 'select',
      options: ['default', 'plain'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    href: '#',
    ariaLabel: 'Plan naam',
    appearance: 'default',
  },
  render: (args) => html`
    <mijnservices-plan-card href=${args.href} aria-label=${args.ariaLabel} appearance=${args.appearance}>
      <span slot="domain">Domein naam</span>
      <h3 slot="heading">Plan naam</h3>
    </mijnservices-plan-card>
  `,
};

export const WithDate: Story = {
  args: {
    href: '#',
    ariaLabel: 'Plan naam',
    date: '10 juni 2026',
    dateTime: '2026-06-10',
    appearance: 'default',
  },
  render: (args) => html`
    <mijnservices-plan-card
      href=${args.href}
      aria-label=${args.ariaLabel}
      date=${args.date}
      date-time=${args.dateTime}
      appearance=${args.appearance}
    >
      <span slot="domain">Domein naam</span>
      <h3 slot="heading">Plan naam</h3>
    </mijnservices-plan-card>
  `,
};

export const WithSlotContent: Story = {
  args: {
    href: '#',
    ariaLabel: 'Plan naam',
    appearance: 'default',
  },
  render: (args) => html`
    <mijnservices-plan-card href=${args.href} aria-label=${args.ariaLabel} appearance=${args.appearance}>
      <span slot="domain">Domein naam</span>
      <h3 slot="heading">Plan naam</h3>
      <button type="button">Bekijk details</button>
    </mijnservices-plan-card>
  `,
};

export const Plain: Story = {
  args: {
    href: '#',
    ariaLabel: 'Plan naam',
    appearance: 'plain',
  },
  render: (args) => html`
    <mijnservices-plan-card href=${args.href} aria-label=${args.ariaLabel} appearance=${args.appearance}>
      <span slot="domain">Domein naam</span>
      <h3 slot="heading">Plan naam</h3>
    </mijnservices-plan-card>
  `,
};

export const PlainWithDate: Story = {
  args: {
    href: '#',
    ariaLabel: 'Plan naam',
    date: '10 juni 2026',
    dateTime: '2026-06-10',
    appearance: 'plain',
  },
  render: (args) => html`
    <mijnservices-plan-card
      href=${args.href}
      aria-label=${args.ariaLabel}
      date=${args.date}
      date-time=${args.dateTime}
      appearance=${args.appearance}
    >
      <span slot="domain">Domein naam</span>
      <h3 slot="heading">Plan naam</h3>
    </mijnservices-plan-card>
  `,
};
