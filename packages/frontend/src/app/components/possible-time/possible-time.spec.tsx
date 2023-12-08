import { render } from '@testing-library/react';
import { DateRange } from '@plan2gather/backend/types';
import PossibleTime from './possible-time';

const dateRange: DateRange = {
  start: '2022-01-01T00:00:00.000Z',
  end: '2022-01-01T23:59:59.999Z',
};

describe('GatheringDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PossibleTime
        dateRange={dateRange}
        users={['Chris']}
        timezone="America/Los_Angeles"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
