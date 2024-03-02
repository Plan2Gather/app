import { render } from '@testing-library/react';
import { DateTime } from 'luxon';

import TimePopover from './time-popover';

import type { DateRangeLuxon } from '@backend/types';

const dateRange: DateRangeLuxon = {
  start: DateTime.fromISO('2022-01-01T00:00:00.000Z'),
  end: DateTime.fromISO('2022-01-01T23:59:59.999Z'),
};

describe('TimePopover', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TimePopover
        weekday="monday"
        dateRange={dateRange}
        users={['Chris']}
        timezone="America/Los_Angeles"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
