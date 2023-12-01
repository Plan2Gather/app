import { render } from '@testing-library/react';
import GatheringDetails from '../gathering-details/gathering-details';
import { PossibleTimeData } from '@plan2gather/backend/types';
import PossibleTime from './possible-time';

const defaultPossibleTime: PossibleTimeData = {
  name: 'Test Gathering',
  description: 'Test Gathering Description',
  timezone: 'America/New_York',
  scheduleType: 'dayOfWeek',
  allowedPeriods: [
    {
      start: '2021-10-10T12:00:00.000Z',
      end: '2021-10-10T13:00:00.000Z',
    },
  ],
};

describe('GatheringDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GatheringDetails gatheringData={defaultGatheringData} />
    );
    expect(baseElement).toBeTruthy();
  });
});
