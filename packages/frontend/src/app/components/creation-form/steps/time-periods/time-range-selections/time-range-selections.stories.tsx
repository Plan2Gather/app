import type { Meta } from '@storybook/react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TimeRangeSelections from './time-range-selections';

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
