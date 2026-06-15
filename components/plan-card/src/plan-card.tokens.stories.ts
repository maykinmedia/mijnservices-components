import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/PlanCard/Design Tokens',
};

export default meta;
type Story = StoryObj;

const tokensJson = JSON.stringify(
  {
    mijnservices: {
      'plan-card': {
        'background-color': {},
        'border-color': {},
        'border-width': {},
        'border-radius': {},
        'padding-block': {},
        'padding-inline': {},
        domain: {
          color: {},
          'font-size': {},
          'font-weight': {},
        },
        heading: {
          color: {},
          'font-size': {},
          'font-weight': {},
        },
        date: {
          color: {},
          'font-size': {},
        },
        action: {
          color: {},
        },
        footer: {
          'margin-block-start': {},
        },
      },
    },
  },
  null,
  2,
);

const cssTemplate = `
.your-theme {
  /* --mijnservices-plan-card-background-color: <color>; */
  /* --mijnservices-plan-card-border-color: <color>; */
  /* --mijnservices-plan-card-border-width: <length>; */
  /* --mijnservices-plan-card-border-radius: <length>; */
  /* --mijnservices-plan-card-padding-block: <length>; */
  /* --mijnservices-plan-card-padding-inline: <length>; */
  /* --mijnservices-plan-card-domain-color: <color>; */
  /* --mijnservices-plan-card-domain-font-size: <length>; */
  /* --mijnservices-plan-card-domain-font-weight: <number>; */
  /* --mijnservices-plan-card-heading-color: <color>; */
  /* --mijnservices-plan-card-heading-font-size: <length>; */
  /* --mijnservices-plan-card-heading-font-weight: <number>; */
  /* --mijnservices-plan-card-date-color: <color>; */
  /* --mijnservices-plan-card-date-font-size: <length>; */
  /* --mijnservices-plan-card-action-color: <color>; */
  /* --mijnservices-plan-card-footer-margin-block-start: <length>; */
}
`.trim();

export const Tokens: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <style>
      .tokens-section {
        font-family: sans-serif;
        max-inline-size: 860px;
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
      }
      .tokens-section h2 {
        font-size: 1.25rem;
        margin-block: 0;
      }
      .tokens-section p {
        margin-block: 0;
        line-height: 1.6;
      }
      .tokens-section pre {
        background-color: #f4f4f4;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
        font-size: 0.875rem;
        margin-block: 0;
      }
      .copy-button {
        align-self: flex-start;
        cursor: pointer;
        padding: 0.4rem 0.8rem;
        font-size: 0.875rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #fff;
      }
      .copy-button:hover {
        background: #f0f0f0;
      }
    </style>

    <div class="tokens-section">
      <div>
        <h2>Design tokens JSON</h2>
        <p>
          Copy the JSON template below to reuse this component. Replace each empty <code>{}</code> with
          <code>{ "$value": "#123456", "$description": "my design choice" }</code>. Use
          <a href="https://amzn.github.io/style-dictionary/#/" target="_blank">Style Dictionary</a>
          to translate your JSON tokens to CSS.
        </p>
      </div>
      <button
        class="copy-button"
        onclick="navigator.clipboard.writeText(${JSON.stringify(
          tokensJson,
        )}).then(() => { this.textContent = 'Copied!'; setTimeout(() => { this.textContent = 'Copy JSON'; }, 2000); })"
      >
        Copy JSON
      </button>
      <pre>${tokensJson}</pre>

      <div>
        <h2>CSS template</h2>
        <p>If you want to get started quickly without JSON tokens, use this CSS template directly in your project.</p>
      </div>
      <button
        class="copy-button"
        onclick="navigator.clipboard.writeText(${JSON.stringify(
          cssTemplate,
        )}).then(() => { this.textContent = 'Copied!'; setTimeout(() => { this.textContent = 'Copy CSS'; }, 2000); })"
      >
        Copy CSS
      </button>
      <pre>${cssTemplate}</pre>
    </div>
  `,
};
