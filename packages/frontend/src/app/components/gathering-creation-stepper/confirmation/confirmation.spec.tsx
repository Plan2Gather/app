import { render } from '@testing-library/react';

import Confirmation from './confirmation';

describe('Confirmation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Confirmation />);
    expect(baseElement).toBeTruthy();
  });
});
