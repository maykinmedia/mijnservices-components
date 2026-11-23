import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../components/react/**/*.mdx', '../components/react/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', 'storybook-addon-pseudo-states'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  refs: {
    'web-components': {
      title: 'Web Components',
      url: 'https://maykinmedia.github.io/mijnservices-components',
      // Links back to the main (web components) Storybook
    },
  },
  // Use package source instead of dist: styles included, no rebuild needed
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          '@mijnservices/chat-message': fileURLToPath(
            new URL('../components/react/chat-message/src/index.ts', import.meta.url),
          ),
        },
      },
    }),
};

export default config;
