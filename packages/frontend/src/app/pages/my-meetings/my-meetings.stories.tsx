import React from 'react';
import type { Meta } from '@storybook/react';
import { MyMeetings, MyMeetingsProps } from './my-meetings';

export default {
    title: 'MyMeetings',
    component: MyMeetings,
} as Meta;

const Template: Story<MyMeetingsProps> = (args) => <MyMeetings {...args} />;

export const Default = Template.bind({});
Default.args = {
    userId: 'test-user-id',
};