import React from 'react';
import { render } from '@testing-library/react';
import MyGatherings from './my-gatherings-page';
import { TRPCWrapper } from '../../../utils/test-utils';

describe('MyGatherings', () => {
  it('renders without crashing', () => {
    render(
      <TRPCWrapper>
        <MyGatherings />
      </TRPCWrapper>
    );
  });
});
