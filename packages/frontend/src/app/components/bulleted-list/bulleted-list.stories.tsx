import type { Meta } from '@storybook/react';
import BulletedList from './bulleted-list';
import BulletedListItem from './bulleted-list-item/bulleted-list-item';

const meta: Meta<typeof BulletedList> = {
    component: BulletedList,
};
export default meta;

export const Primary = {
    args: {
        children: [
            <BulletedListItem>test 1</BulletedListItem>,
            <BulletedListItem>test 2</BulletedListItem>,
        ],
    },
};
