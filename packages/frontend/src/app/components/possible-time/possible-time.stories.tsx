import type { Meta, StoryObj } from '@storybook/react';
import PossibleTime from './possible-time';

const meta: Meta<typeof PossibleTime> = {
  component: PossibleTime,
};
export default meta;
type Story = StoryObj<typeof PossibleTime>;

export const Primary: Story = {
  args: {
    timeData: {
      "id": "123",
      "time": "2021-10-10T12:00:00.000Z",
      "username": "testuser",
      "gatheringId": "1234"
    }
  },
};
