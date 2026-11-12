import type { Preview } from '@storybook/react-vite';
import './denhaag-comparison-theme.css';
import './messages-theme.css';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    // Een story kan een andere breedte kiezen met parameters: { maxInlineSize: '960px' }
    (Story, context) => (
      <div style={{ maxInlineSize: context.parameters.maxInlineSize ?? '600px', padding: '2rem' }}>
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
