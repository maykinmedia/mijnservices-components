import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './plan-card.js';

const meta: Meta = {
  title: 'Components/PlanCard',
  component: 'mijnservices-plan-card',
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    domain: { control: 'text' },
    href: { control: 'text' },
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
    heading: 'Plan naam',
    domain: 'Domein naam',
    href: '#',
    appearance: 'default',
  },
  render: (args) => html`
    <mijnservices-plan-card
      heading=${args.heading}
      domain=${args.domain}
      href=${args.href}
      appearance=${args.appearance}
    ></mijnservices-plan-card>
  `,
};

export const WithDate: Story = {
  args: {
    heading: 'Plan naam',
    domain: 'Domein naam',
    href: '#',
    date: '10 juni 2026',
    dateTime: '2026-06-10',
    appearance: 'default',
  },
  render: (args) => html`
    <mijnservices-plan-card
      heading=${args.heading}
      domain=${args.domain}
      href=${args.href}
      date=${args.date}
      date-time=${args.dateTime}
      appearance=${args.appearance}
    ></mijnservices-plan-card>
  `,
};

export const WithSlotContent: Story = {
  args: {
    heading: 'Plan naam',
    domain: 'Domein naam',
    href: '#',
    appearance: 'default',
  },
  render: (args) => html`
    <mijnservices-plan-card
      heading=${args.heading}
      domain=${args.domain}
      href=${args.href}
      appearance=${args.appearance}
    >
      <button type="button">Bekijk details</button>
    </mijnservices-plan-card>
  `,
};

export const Plain: Story = {
  args: {
    heading: 'Plan naam',
    domain: 'Domein naam',
    href: '#',
    appearance: 'plain',
  },
  render: (args) => html`
    <mijnservices-plan-card
      heading=${args.heading}
      domain=${args.domain}
      href=${args.href}
      appearance=${args.appearance}
    ></mijnservices-plan-card>
  `,
};

export const PlainWithDate: Story = {
  args: {
    heading: 'Plan naam',
    domain: 'Domein naam',
    href: '#',
    date: '10 juni 2026',
    dateTime: '2026-06-10',
    appearance: 'plain',
  },
  render: (args) => html`
    <mijnservices-plan-card
      heading=${args.heading}
      domain=${args.domain}
      href=${args.href}
      date=${args.date}
      date-time=${args.dateTime}
      appearance=${args.appearance}
    ></mijnservices-plan-card>
  `,
};
