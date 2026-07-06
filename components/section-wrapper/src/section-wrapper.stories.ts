import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './section-wrapper.js';

const meta: Meta = {
  title: 'Components/SectionWrapper',
  component: 'mijnservices-section-wrapper',
  tags: ['autodocs'],
  decorators: [(story) => html` <div style="max-inline-size: 480px; padding: 2rem;">${story()}</div> `],
  argTypes: {
    heading: { control: 'text' },
    headingLevel: { control: 'number' },
    eyebrow: { control: 'text' },
    href: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    heading: 'Zelfstandig gaan wonen',
    headingLevel: 3,
    eyebrow: 'Doel',
    href: '#',
  },
  render: (args) => html`
    <mijnservices-section-wrapper
      heading=${args.heading}
      heading-level=${args.headingLevel}
      eyebrow=${args.eyebrow}
      href=${args.href}
    >
      <ul role="list" style="list-style: none; margin: 0; padding: 0;">
        <li>Voeg uw energiecontract toe</li>
        <li>Plan opsturen voor inrichten van kinderkamer</li>
      </ul>
    </mijnservices-section-wrapper>
  `,
};

export const WithoutEyebrow: Story = {
  args: {
    heading: 'Relatie met kinderen verbeteren',
    headingLevel: 3,
  },
  render: (args) => html`
    <mijnservices-section-wrapper heading=${args.heading} heading-level=${args.headingLevel}>
      <ul role="list" style="list-style: none; margin: 0; padding: 0;">
        <li>Doe aanvraag voor een Ooievaarspas</li>
        <li>Werken aan relatie mbv gezinscoach</li>
      </ul>
    </mijnservices-section-wrapper>
  `,
};

export const WithoutLink: Story = {
  args: {
    heading: 'Regie nemen over financiën',
    headingLevel: 3,
    eyebrow: 'Doel',
  },
  render: (args) => html`
    <mijnservices-section-wrapper heading=${args.heading} heading-level=${args.headingLevel} eyebrow=${args.eyebrow}>
      <ul role="list" style="list-style: none; margin: 0; padding: 0;">
        <li>Voeg uw bewijs toe van deelname training "weet wat je besteedt"</li>
      </ul>
    </mijnservices-section-wrapper>
  `,
};
