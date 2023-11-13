import { render } from '@testing-library/react';

import GatheringDetails from './gathering-details';

describe('GatheringDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GatheringDetails />);
    expect(baseElement).toBeTruthy();
  });
});
