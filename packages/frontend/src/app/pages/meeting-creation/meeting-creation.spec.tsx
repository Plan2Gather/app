import { render } from '@testing-library/react';

import Creation from './meeting-creation';

describe('Meeting Creation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Creation />);
    expect(baseElement).toBeTruthy();
  });
});
