import type { Meta, StoryObj } from '@storybook/react';
import PossibleTime from './possible-time';

const meta: Meta<typeof PossibleTime> = {
  component: PossibleTime,
};
export default meta;
type Story = StoryObj<typeof PossibleTime>;

export const Primary: Story = {
  args: {
    dateRange: {
      start: '2022-01-01T00:00:00.000Z',
      end: '2022-01-01T23:59:59.999Z',
    },
    users: ['User 1', 'User 2', 'User 3'],
  },
};
