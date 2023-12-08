import React from 'react';
import { render } from '@testing-library/react';
import MyMeetings from './my-meetings-page';
import { TRPCWrapper } from '../../../utils/test-utils';

describe('MyMeetings', () => {
  it('renders without crashing', () => {
    render(
      <TRPCWrapper>
        <MyMeetings />
      </TRPCWrapper>
    );
  });
});
