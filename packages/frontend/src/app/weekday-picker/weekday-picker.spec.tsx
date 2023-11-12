import { render } from '@testing-library/react';

import WeekdayPicker from './weekday-picker';

describe('WeekdayPicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WeekdayPicker />);
    expect(baseElement).toBeTruthy();
  });
});
