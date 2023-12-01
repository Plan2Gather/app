import { render } from '@testing-library/react';

import { GatheringFormData } from '@plan2gather/backend/types';
import GatheringDetails from './gathering-details';

const defaultGatheringData: GatheringFormData = {
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