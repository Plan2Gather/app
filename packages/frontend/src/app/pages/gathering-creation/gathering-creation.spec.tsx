import { render } from '@testing-library/react';

import Creation from './gathering-creation';

describe('Gathering Creation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Creation />);
    expect(baseElement).toBeTruthy();
  });
});
