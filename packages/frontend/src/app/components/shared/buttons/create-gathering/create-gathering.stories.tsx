import CreateGatheringButton from './create-gathering';

import type { Meta } from '@storybook/react';

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
