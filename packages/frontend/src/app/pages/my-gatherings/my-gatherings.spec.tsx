import { render } from '@testing-library/react';
import MyGatherings from './my-gatherings';
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
