import type { Meta } from '@storybook/react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TimeRangePicker from './time-range-picker';

const meta: Meta<typeof TimeRangePicker> = {
  component: TimeRangePicker,
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
