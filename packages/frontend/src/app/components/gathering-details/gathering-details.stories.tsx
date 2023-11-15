import type { Meta, StoryObj } from '@storybook/react';
import { GatheringDetails } from './gathering-details';

const meta: Meta<typeof GatheringDetails> = {
  component: GatheringDetails,
  title: 'GatheringDetails',
};
export default meta;
type Story = StoryObj<typeof GatheringDetails>;

export const Primary: Story = {
  args: {
    gatheringData: {
      name: 'Test Meeting',
      description: 'This is a test meeting',
      timezone: 'America/New_York',
      allowedPeriods: [{ start: '', end: '' }],
      id: '123',
      availability: [{ start: '', end: '' }],
      creationDate: '',
    },
  },
};
