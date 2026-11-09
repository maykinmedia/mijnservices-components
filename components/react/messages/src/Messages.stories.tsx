import type { Meta, StoryObj } from '@storybook/react-vite';
import html from './messages.html?raw';
import './styles/index.scss';

/**
 * Prototype: alleen HTML + SCSS, nog geen React-componenten.
 * Pas `messages.html` en `messages.scss` aan; Storybook herlaadt automatisch.
 */
const meta: Meta = {
  title: 'React/Messages (prototype)',
};

export default meta;

export const Default: StoryObj = {
  render: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
};
