import { render } from '@testing-library/react';

import Homepage from './homepage';

describe('Homepage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Homepage />);
    expect(baseElement).toBeTruthy();
  });
});
