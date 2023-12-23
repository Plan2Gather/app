import Filter from './filter';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof Filter> = {
  component: Filter,
};
export default meta;

export const Primary = {
  args: {
    data: {
      availability: {
        'user test 1': {},
        'user test 2': {},
      },
    },
  },
};
