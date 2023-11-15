import { render } from '@testing-library/react';

import { GatheringDetails } from './gathering-details';

const defaultGatheringData = {
  name: 'Test Gathering',
  description: 'Test Gathering Description',
  timezone: 'America/New_York',
  start_time: '2021-10-10T12:00:00.000Z',
  end_time: '2021-10-10T13:00:00.000Z',
};

describe('GatheringDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GatheringDetails gatheringData={defaultGatheringData} />
    );
    expect(baseElement).toBeTruthy();
  });
});
