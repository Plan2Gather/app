import type { Meta } from '@storybook/react';
import MyMeetingsButton from './my-meetings-button';

const meta: Meta<typeof MyMeetingsButton> = {
  component: MyMeetingsButton,
  argTypes: {
    variant: {
      options: ['toolbar', 'homepage'],
      control: { type: 'radio' },
    },
  },
};
export default meta;

export const Primary = {
  args: {},
};
