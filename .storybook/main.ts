import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../.storybook/Introduction.mdx', '../components/*/src/*.mdx', '../components/*/src/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  // Lokaal (pnpm storybook) de React-Storybook van localhost tonen, zodat nieuwe componenten
  // meteen zichtbaar zijn. De gepubliceerde versie gebruikt de React-Storybook op GitHub Pages.
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
