import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './plan-card.js';

const meta: Meta = {
  title: 'Components/PlanCard',
  component: 'mijnservices-plan-card',
  tags: ['autodocs'],
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
