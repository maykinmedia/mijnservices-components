import type { Preview } from '@storybook/web-components-vite';
import { html } from 'lit';

const preview: Preview = {
  decorators: [(story) => html` <div style="max-inline-size: 600px; padding: 2rem;">${story()}</div> `],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
};

export default preview;
