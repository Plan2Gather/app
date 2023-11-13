import { render } from '@testing-library/react';

import DayOfWeekPicker from './day-of-week-picker';

describe('DayOfWeekPicker', () => {
  const mockSetFormData = vi.fn();
  const mockOnSuccessfulSubmit = vi.fn();

  it('should render successfully', () => {
    const { baseElement } = render(
      <DayOfWeekPicker
        formData={[]}
        setFormData={mockSetFormData}
        setSubmitRef={() => {}}
        onSuccessfulSubmit={mockOnSuccessfulSubmit}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
