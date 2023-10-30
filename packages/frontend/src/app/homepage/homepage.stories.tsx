import type { Meta, StoryObj } from '@storybook/react';
import { Homepage } from './homepage';

const meta: Meta<typeof Homepage> = {
  component: Homepage,
  title: 'Homepage',
};
export default meta;
type Story = StoryObj<typeof Homepage>;

export const Primary = {
  args: {},
};
