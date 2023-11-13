import { render } from '@testing-library/react';

import DayOfWeekPicker from './day-of-week-picker';

describe('DayOfWeekPicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DayOfWeekPicker />);
    expect(baseElement).toBeTruthy();
  });
});
