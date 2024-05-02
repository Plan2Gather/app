import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { render } from '@testing-library/react';
import { FormContainer } from 'react-hook-form-mui';

import TimeRangePicker from './time-range-picker';

describe('TimeRangePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <FormContainer>
          <TimeRangePicker timezone="America/Los_Angeles" />
        </FormContainer>
      </LocalizationProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
