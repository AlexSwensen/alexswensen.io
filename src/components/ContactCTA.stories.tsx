import type { Meta, StoryObj } from '@storybook/react';
import ContactCTA from './ContactCTA';

const meta = {
  title: 'Components/ContactCTA',
  component: ContactCTA,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContactCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
