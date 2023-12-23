import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import TimeRangeSelections from './time-range-selections';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof TimeRangeSelections> = {
  component: TimeRangeSelections,
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Story />
      </LocalizationProvider>
    ),
  ],
};
export default meta;

export const Primary = {
  args: {},
};
