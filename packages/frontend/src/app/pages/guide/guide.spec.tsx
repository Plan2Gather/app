import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Guide from './guide';

describe('Guide', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Guide />);
    expect(baseElement).toBeTruthy();
  });
});
