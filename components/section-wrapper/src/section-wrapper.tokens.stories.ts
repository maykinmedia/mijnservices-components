import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/SectionWrapper/Design Tokens',
};

export default meta;
type Story = StoryObj;

const tokensJson = JSON.stringify(
  {
    mijnservices: {
      'section-wrapper': {
        'border-color': {},
        'border-width': {},
        'border-radius': {},
        'padding-block': {},
        'padding-inline': {},
        gap: {},
        'hgroup-gap': {},
        eyebrow: {
          color: {},
          'font-size': {},
          'font-weight': {},
        },
        heading: {
          color: {},
          'font-family': {},
          'font-size': {},
          'font-weight': {},
        },
        link: {
          'font-family': {},
          'focus-outline-color': {},
          'focus-outline-width': {},
          'focus-outline-offset': {},
        },
      },
    },
  },
  null,
  2,
);

const cssTemplate = `
.your-theme {
  /* --mijnservices-section-wrapper-border-color: <color>; */
  /* --mijnservices-section-wrapper-border-width: <length>; */
  /* --mijnservices-section-wrapper-border-radius: <length>; */
  /* --mijnservices-section-wrapper-padding-block: <length>; */
  /* --mijnservices-section-wrapper-padding-inline: <length>; */
  /* --mijnservices-section-wrapper-gap: <length>; */
  /* --mijnservices-section-wrapper-hgroup-gap: <length>; */
  /* --mijnservices-section-wrapper-eyebrow-color: <color>; */
  /* --mijnservices-section-wrapper-eyebrow-font-size: <length>; */
  /* --mijnservices-section-wrapper-eyebrow-font-weight: <number>; */
  /* --mijnservices-section-wrapper-heading-color: <color>; */
  /* --mijnservices-section-wrapper-heading-font-family: <font-family>; */
  /* --mijnservices-section-wrapper-heading-font-size: <length>; */
  /* --mijnservices-section-wrapper-heading-font-weight: <number>; */
  /* --mijnservices-section-wrapper-link-font-family: <font-family>; */
  /* --mijnservices-section-wrapper-link-focus-outline-color: <color>; */
  /* --mijnservices-section-wrapper-link-focus-outline-width: <length>; */
  /* --mijnservices-section-wrapper-link-focus-outline-offset: <length>; */
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
