import type { Meta, StoryObj } from '@storybook/react';
import { MeetingDetails } from './meeting-details';

const meta: Meta<typeof MeetingDetails> = {
  component: MeetingDetails,
  title: 'MeetingDetails',
};
export default meta;
type Story = StoryObj<typeof MeetingDetails>;

export const Primary: Story = {
  args: {
    meetingData: {
      name: 'Test Meeting',
      description: 'This is a test meeting',
      timezone: 'America/New_York',
      allowedPeriods: [{ start: '', end: '' }],
      id: '123',
      availability: [{ start: '', end: '' }],
      creationDate: ''
    },
  },
};