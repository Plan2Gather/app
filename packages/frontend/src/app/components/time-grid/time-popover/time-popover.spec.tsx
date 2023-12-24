import { render } from '@testing-library/react';

import { type DateRange } from '@backend/types';

import TimePopover from './time-popover';

const dateRange: DateRange = {
  start: '2022-01-01T00:00:00.000Z',
  end: '2022-01-01T23:59:59.999Z',
};

describe('TimePopover', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TimePopover dateRange={dateRange} users={['Chris']} timezone="America/Los_Angeles" />
    );
    expect(baseElement).toBeTruthy();
  });
});
