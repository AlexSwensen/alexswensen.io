import type { Meta, StoryObj } from '@storybook/react';
import Skills from '../../components/Skills';

const meta = {
  title: 'Components/Skills',
  component: Skills,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
