import type { Meta } from '@storybook/react';
import CreateGatheringButton from './create-gathering-button';

const meta: Meta<typeof CreateGatheringButton> = {
  component: CreateGatheringButton,
  title: 'CreateGatheringButton',
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
