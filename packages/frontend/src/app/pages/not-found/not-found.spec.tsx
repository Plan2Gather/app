import { render } from '@testing-library/react';

import NotFound from './not-found';

describe('NotFound', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotFound />);
    expect(baseElement).toBeTruthy();
  });
});
