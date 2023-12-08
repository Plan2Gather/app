// participating-meetings.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ParticipatingMeetings, {
  ParticipatingMeetingsProps,
} from './participating-meetings';

export default {
  title: 'ParticipatingMeetings',
  component: ParticipatingMeetings,
} as Meta;

const Template: Story<ParticipatingMeetingsProps> = (args) => (
  <ParticipatingMeetings {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userId: 'test-user-id',
};
