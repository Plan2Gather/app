import { render } from '@testing-library/react';

import TimePeriods from './time-periods';

describe('TimePeriods', () => {
  it('should render successfully', () => {
    const mockOnSuccessfulSubmit = vi.fn();
    const { baseElement } = render(
      <TimePeriods
        possibleDates={{ type: 'date', data: [] }}
        formData={[]}
        onSuccessfulSubmit={mockOnSuccessfulSubmit}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
