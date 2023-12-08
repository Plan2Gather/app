import type { Meta } from '@storybook/react';
import TimeGrid from './time-grid';
import { combineTimeSlots, parseListForTimeSlots } from './time-grid.helpers';

const meta: Meta<typeof TimeGrid> = {
  component: TimeGrid,
  title: 'TimeGrid', // Title for your story
  parameters: {
    controls: { hideNoControlsWarning: true }, // Optional: Hide controls warning
  },
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

export function Primary(args: {
  data: {
    color: string;
    names: string[];
    period: { start: string; end: string };
  }[][];
  columnLabels: string[];
  rowLabels: string[];
}) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TimeGrid {...args} />;
}

Primary.args = parseListForTimeSlots(combineTimeSlots(test));
