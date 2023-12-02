import { render } from '@testing-library/react';
import { PossibleTimeData } from '@plan2gather/backend/types';
import PossibleTime from './possible-time';

const defaultTimeData: PossibleTimeData = {
  id: '123',
  startDatetime: '2021-10-10T12:00:00.000Z',
  endDatetime: '2021-10-10T13:00:00.000Z',
  users: ['testuser', 'testuser2'],
  gatheringId: '1234',
};

describe('GatheringDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PossibleTime timeData={defaultTimeData} />);
    expect(baseElement).toBeTruthy();
  });
});
