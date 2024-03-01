import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { TRPCWrapper } from '@/utils/test-utils';

import GatheringDetails from './gathering-details';

import type { GatheringFormData } from '@backend/types';

const defaultGatheringData: GatheringFormData = {
  name: 'Test Gathering',
  description: 'Test Gathering Description',
  timezone: 'America/New_York',
  allowedPeriod: {
    weekdays: ['wednesday'],
    period: {
      start: '2021-10-10T12:00:00.000Z',
      end: '2021-10-10T13:00:00.000Z',
    },
  },
};

describe('GatheringDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <TRPCWrapper>
          <GatheringDetails gatheringData={defaultGatheringData} />
        </TRPCWrapper>
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
