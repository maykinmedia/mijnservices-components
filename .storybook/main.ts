import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../components/*/src/*.stories.ts'],
  addons: [],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
};

export default config;
