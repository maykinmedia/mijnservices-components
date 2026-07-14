import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../components/react/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', 'storybook-addon-pseudo-states'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  refs: {
    'web-components': {
      title: 'Web Components',
      url: 'https://maykinmedia.github.io/mijnservices-components',
      // wijst terug naar de hoofd-Storybook (web components), zodat je vanuit de React-Storybook ook naar die sectie kan navigeren zonder van URL te wisselen
    },
  },
};

export default config;
