import type { Meta } from '@storybook/react';
import LoadingButton from './loading-button';

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
