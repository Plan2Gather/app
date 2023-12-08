import type { Meta, StoryObj } from '@storybook/react';
import TimeGridWrapper from './time-grid-wrapper';

const meta: Meta<typeof TimeGridWrapper> = {
  component: TimeGridWrapper,
};

const test = [
  {
    name: 'Chris',
    availability: {
      monday: [
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T17:00:00.000-08:00',
        },
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T09:30:00.000-08:00',
        },
      ],
      friday: [
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T09:30:00.000-08:00',
        },
      ],
      saturday: [
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T09:15:00.000-08:00',
        },
      ],
    },
  },
  {
    name: 'Spencer',
    availability: {
      monday: [
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T15:00:00.000-08:00',
        },
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T09:30:00.000-08:00',
        },
      ],
      friday: [
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T09:30:00.000-08:00',
        },
      ],
    },
  },
];

export default meta;

type Story = StoryObj<typeof TimeGridWrapper>;

export const Primary: Story = {
  args: {
    userAvailability: test,
  },
};
