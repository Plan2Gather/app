import type { Meta } from '@storybook/react';
import CreateGatheringButton from './create-gathering';

const meta: Meta<typeof CreateGatheringButton> = {
  component: CreateGatheringButton,
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
