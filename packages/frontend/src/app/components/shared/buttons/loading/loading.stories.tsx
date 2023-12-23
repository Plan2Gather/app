import LoadingButton from './loading';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof LoadingButton> = {
  component: LoadingButton,
};
export default meta;

export const Primary = {
  args: {
    children: 'Click me',
    variant: 'contained',
  },
};
