import MyGatheringsButton from './my-gatherings';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof MyGatheringsButton> = {
  component: MyGatheringsButton,
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
