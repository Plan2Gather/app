import type { Meta } from '@storybook/react';
import TimeGrid from './timegrid';

const meta: Meta<typeof TimeGrid> = {
  component: TimeGrid,
  title: 'TimeGrid', // Title for your story
  parameters: {
    controls: { hideNoControlsWarning: true }, // Optional: Hide controls warning
  },
};

export default meta;

export const Primary = (args: { data: string[][] }) => <TimeGrid {...args} />;

Primary.args = {
  data: Array.from({ length: 24 *4 }, (_, rowIndex) =>
    Array.from({ length: 7 }, (_, colIndex) =>
      colIndex % 2 === 0 ? '#00ff00' : '#cccccc'
    )
  ),
};