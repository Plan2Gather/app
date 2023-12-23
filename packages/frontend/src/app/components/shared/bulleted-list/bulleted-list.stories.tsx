import BulletedList from './bulleted-list';
import BulletedListItem from './bulleted-list-item/bulleted-list-item';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof BulletedList> = {
  component: BulletedList,
};
export default meta;

export const Primary = {
  args: {
    children: [
      <BulletedListItem key="1">test 1</BulletedListItem>,
      <BulletedListItem key="2">test 2</BulletedListItem>,
    ],
  },
};
