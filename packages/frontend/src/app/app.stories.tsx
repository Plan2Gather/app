import type { Meta, StoryObj } from '@storybook/react';
import { App } from './app';

const meta: Meta<typeof App> = {
  component: App,
  title: 'App',
};
export default meta;
type Story = StoryObj<typeof App>;

export const Primary = {
  args: {},
};
