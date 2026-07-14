import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseCard } from './CaseCard';

const meta: Meta<typeof CaseCard> = {
  title: 'React/CaseCard',
  component: CaseCard,
};

export default meta;
type Story = StoryObj<typeof CaseCard>;

export const Default: Story = {
  args: {
    title: 'Aanvraag verhuizing',
    subTitle: 'Ingediend op 12 juli 2026',
    context: 'Gemeente Den Haag',
    href: '#',
  },
};

export const WithEyebrowAndHeading: Story = {
  args: {
    eyebrow: 'Lopende aanvraag',
    title: 'Aanvraag verhuizing',
    headingLevel: 2,
    subTitle: 'Ingediend op 12 juli 2026',
    href: '#',
  },
};
