import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardAsLink } from './CardAsLink';

const meta: Meta<typeof CardAsLink> = {
  title: 'React/CardAsLink',
  component: CardAsLink,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    subTitle: { control: 'text' },
    headingLevel: {
      control: 'select',
      options: [undefined, 2, 3, 4, 5, 6],
    },
    context: { control: 'text' },
    href: { control: 'text' },
    appearance: {
      control: 'select',
      options: ['default', 'archived', 'list'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardAsLink>;

const decorators: typeof meta.decorators = [
  (Story) => (
    <div style={{ maxInlineSize: '360px' }}>
      <Story />
    </div>
  ),
];

export const Default: Story = {
  args: {
    title: 'Aanvraag verhuizing',
    subTitle: 'Ingediend op 12 juli 2026',
    context: '',
    href: '#',
  },
  decorators,
};

export const WithContext: Story = {
  args: {
    ...Default.args,
    context: 'Gemeente Den Haag',
  },
  decorators,
};

export const WithCaseNumber: Story = {
  args: {
    ...Default.args,
    context: 'VTH-TEST-2026-02437',
  },
  decorators,
};

export const WithEyebrow: Story = {
  args: {
    ...Default.args,
    eyebrow: 'Lopende aanvraag',
  },
  decorators,
};

export const WithHeadingLevel: Story = {
  args: {
    ...Default.args,
    eyebrow: 'Lopende aanvraag',
    headingLevel: 2,
  },
  decorators,
};

export const Archived: Story = {
  args: { ...Default.args, appearance: 'archived' },
  decorators,
};

export const ArchivedWithCaseNumber: Story = {
  args: {
    ...Default.args,
    appearance: 'archived',
    context: 'VTH-TEST-2026-02437',
  },
  decorators,
};

export const List: Story = {
  args: {
    ...Default.args,
    appearance: 'list',
  },
};

export const ListWithCaseNumber: Story = {
  args: {
    ...Default.args,
    appearance: 'list',
    context: 'VTH-TEST-2026-02437',
  },
};

export const Hover: Story = {
  args: {
    ...Default.args,
  },
  decorators,
  parameters: {
    pseudo: { hover: true },
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
  },
  decorators,
  parameters: {
    pseudo: { active: true },
  },
};
