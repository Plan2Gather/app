import type { Meta, StoryObj } from '@storybook/react';
import { BulletedListItem } from './bulleted-list-item';

const meta: Meta<typeof BulletedListItem> = {
  component: BulletedListItem,
  title: 'BulletedListItem',
};
export default meta;
type Story = StoryObj<typeof BulletedListItem>;

export const Primary = {
  args: {},
};
