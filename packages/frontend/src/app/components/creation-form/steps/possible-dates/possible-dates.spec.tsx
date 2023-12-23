import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { render } from '@testing-library/react';

import PossibleDatesStep from './possible-dates';

describe('PossibleDatesStep', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <PossibleDatesStep />
      </LocalizationProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
