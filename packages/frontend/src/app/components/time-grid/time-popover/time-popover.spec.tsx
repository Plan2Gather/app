import { render } from '@testing-library/react';
import { DateTime } from 'luxon';

import TimePopover from './time-popover';

import type { DateRangeLuxon } from '@/app/components/time-grid/time-grid.helpers';

const dateRange: DateRangeLuxon = {
  weekday: 'monday',
  start: DateTime.fromISO('2022-01-01T00:00:00.000Z'),
  end: DateTime.fromISO('2022-01-01T23:59:59.999Z'),
};

describe('TimePopover', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TimePopover dateRange={dateRange} users={['Chris']} timezone="America/Los_Angeles" />
    );
    expect(baseElement).toBeTruthy();
  });
});
