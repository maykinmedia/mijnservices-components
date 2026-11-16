import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../.storybook/Introduction.mdx', '../components/*/src/*.mdx', '../components/*/src/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  // In local development (pnpm storybook), points to the local React Storybook
  // on localhost:6007 so that newly developed components are immediately visible.
  // The published Storybook uses the deployed React Storybook on GitHub Pages.
  refs: (_config, { configType }) => ({
    react: {
      title: 'React Components',
      url:
        configType === 'DEVELOPMENT'
          ? 'http://localhost:6007'
          : 'https://maykinmedia.github.io/mijnservices-components/react',
    },
  }),
};

export default config;
