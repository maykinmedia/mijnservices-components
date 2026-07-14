import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: '600px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
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
