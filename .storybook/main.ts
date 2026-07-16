import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../.storybook/Introduction.mdx', '../components/*/src/*.stories.ts', '../components/*/src/*.stories.mdx'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  refs: {
    react: {
      title: 'React Components',
      url: 'https://maykinmedia.github.io/mijnservices-components/react',
    },
  },
};

export default config;
