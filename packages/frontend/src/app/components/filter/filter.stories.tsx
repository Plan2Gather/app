import type { Meta } from '@storybook/react';
import Filter from './filter';

const meta: Meta<typeof Filter> = {
  component: Filter,
  title: 'Filter',
};
export default meta;

export const Primary = {
  args: {
    data: {
      availability: {
        'Naomi': {},
        'Chris': {},
        'Sam': {},
        'Spencer': {},
      },
    },
  },
};
