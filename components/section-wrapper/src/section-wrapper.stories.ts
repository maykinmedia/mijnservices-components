import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './section-wrapper.js';

const meta: Meta = {
  title: 'Components/SectionWrapper',
  component: 'mijnservices-section-wrapper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A labelled section wrapper: an eyebrow label, a heading (optionally a link), and a slot for any content.

**Not a card.** Unlike [\`plan-card\`](?path=/docs/components-plancard--docs), the whole surface isn't clickable — only the heading itself becomes a link when \`href\` is set. Use this for a labelled group of arbitrary content, not a single clickable destination.

**Framework-agnostic:** this renders as a standard Custom Element (\`<mijnservices-section-wrapper>\`), so it works in plain HTML, Vue, Angular, or Svelte without any wrapper. A dedicated React wrapper (\`@mijnservices/section-wrapper/react\`) is also published, since React (pre-19) doesn't reliably pass rich property values or bind custom DOM events to Custom Elements.

**Accessibility note:** the eyebrow and heading are wrapped in an \`<hgroup>\`, with an \`aria-label\` automatically derived from the \`eyebrow\` attribute — there's no separate prop for this, and it can't be set independently. If \`eyebrow\` is empty, no \`aria-label\` is added. \`heading-level\` is left entirely to the consumer, since the correct level depends on where this component sits in the surrounding page outline.

**Only one slot.** The eyebrow and heading are not slottable content — they're controlled through the \`eyebrow\`/\`heading\` attributes so the component can manage the accessible relationship between them. The default slot is for everything else and is never wrapped or restyled by the component itself.

**Header and body padding are independent.** There's no padding on the outer wrapper — only the header (\`hgroup\`) and the body (an internal div wrapping your slotted content) each have their own padding tokens. This split exists because \`<slot>\` itself usually has no box (\`display: contents\`) and can never accept padding directly.

**Theming:** this component uses Shadow DOM, so styles are isolated and can only be customized via CSS custom properties (design tokens) — see the "Design Tokens" page for the full list and a copy-pasteable template.
        `,
      },
    },
  },
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
      <p>Any content can go here.</p>
    </mijnservices-section-wrapper>
  `,
};

export const WithoutEyebrow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'No `eyebrow` set — the `<p>` and its `aria-label` are both omitted entirely, not just hidden.',
      },
    },
  },
  args: {
    heading: 'Relatie met kinderen verbeteren',
    headingLevel: 3,
  },
  render: (args) => html`
    <mijnservices-section-wrapper heading=${args.heading} heading-level=${args.headingLevel}>
      <p>Any content can go here.</p>
    </mijnservices-section-wrapper>
  `,
};

export const WithoutLink: Story = {
  parameters: {
    docs: {
      description: {
        story: 'No `href` set — the heading renders as plain text instead of a link.',
      },
    },
  },
  args: {
    heading: 'Regie nemen over financiën',
    headingLevel: 3,
    eyebrow: 'Doel',
  },
  render: (args) => html`
    <mijnservices-section-wrapper heading=${args.heading} heading-level=${args.headingLevel} eyebrow=${args.eyebrow}>
      <p>Any content can go here.</p>
    </mijnservices-section-wrapper>
  `,
};

export const WithUnorderedListSlot: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The slot shows your own content exactly as you wrote it. These rows are plain markup mocking a task-list item (like Den Haag's ActionSingle) — the component itself never sees or restyles slotted content.",
      },
    },
  },
  args: {
    heading: 'Relatie met kinderen verbeteren',
    headingLevel: 3,
    eyebrow: 'Doel',
    href: '#',
  },
  render: (args) => html`
    <style>
      .mock-action {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        padding-block: 1rem;
        border-block-start: 1px solid #dedede;
      }
      .mock-action__text {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .mock-action__link {
        color: #154273;
        font-weight: 700;
        text-decoration: underline;
      }
      .mock-action__date {
        color: #767676;
        font-size: 0.875rem;
      }
      .mock-action__arrow {
        color: #154273;
        flex-shrink: 0;
      }
    </style>
    <mijnservices-section-wrapper
      heading=${args.heading}
      heading-level=${args.headingLevel}
      eyebrow=${args.eyebrow}
      href=${args.href}
    >
      <div>
        <div class="mock-action">
          <div class="mock-action__text">
            <a class="mock-action__link" href="#">Doe aanvraag voor een Ooievaarspas</a>
            <span class="mock-action__date">vóór 31 maart 2026</span>
          </div>
          <span class="mock-action__arrow" aria-hidden="true">→</span>
        </div>
        <div class="mock-action">
          <div class="mock-action__text">
            <a class="mock-action__link" href="#">Werken aan relatie mbv gezinscoach</a>
            <span class="mock-action__date">vóór 31 maart 2026</span>
          </div>
          <span class="mock-action__arrow" aria-hidden="true">→</span>
        </div>
      </div>
    </mijnservices-section-wrapper>
  `,
};
