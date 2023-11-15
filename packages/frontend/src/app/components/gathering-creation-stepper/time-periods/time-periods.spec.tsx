import { render } from '@testing-library/react';

import TimePeriods from './time-periods';

describe('TimePeriods', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TimePeriods />);
    expect(baseElement).toBeTruthy();
  });
});
