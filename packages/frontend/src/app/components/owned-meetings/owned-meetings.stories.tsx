// owned-meetings.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import  OwnedMeetings from './owned-meetings';

const meta: Meta<typeof OwnedMeetings> = {
    component: OwnedMeetings,
  };
export default meta;
type Story = StoryObj<typeof OwnedMeetings>;


export const Primary: Story = {
    args: {
        userId: 'test-user-id',

    }
}