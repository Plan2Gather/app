import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import MultiDatePicker from './multi-date-picker';

describe('MultiDatePicker', () => {
  const mockSetFormData = vi.fn();
  const mockOnSuccessfulSubmit = vi.fn();

  beforeEach(() => {
    render(
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <MultiDatePicker
          formData={[]}
          setFormData={mockSetFormData}
          setSubmitRef={() => {}}
          onSuccessfulSubmit={mockOnSuccessfulSubmit}
        />
      </LocalizationProvider>
    );
  });

  it.skip('should select multiple dates individually', () => {
    const today = DateTime.local({ locale: 'en-US' }).startOf('day');
    const tomorrow = today.plus({ days: 1 });

    fireEvent.click(screen.getByTestId(`day-${today.toISODate()}`));
    expect(mockSetFormData).toHaveBeenCalledWith([today]);

    fireEvent.click(screen.getByTestId(`day-${tomorrow.toISODate()}`));
    expect(mockSetFormData).toHaveBeenCalledWith([today, tomorrow]);
  });

  it.skip('should select a range of dates using shift click', () => {
    const startDay = DateTime.local();
    const endDay = startDay.plus({ days: 5 });

    // Simulate shift key press
    fireEvent.keyDown(window, { key: 'Shift' });
    fireEvent.click(
      screen.getByRole('button', { name: new RegExp(startDay.toISODate()) })
    );
    fireEvent.click(
      screen.getByRole('button', { name: new RegExp(endDay.toISODate()) })
    );
    fireEvent.keyUp(window, { key: 'Shift' });

    const expectedDates = [];
    for (let d = startDay; d <= endDay; d = d.plus({ days: 1 })) {
      expectedDates.push(d);
    }

    expect(mockSetFormData).toHaveBeenCalledWith(expectedDates);
  });

  it.skip('should clear all selected dates', () => {
    // First select a date
    const today = DateTime.local().toISODate();
    fireEvent.click(screen.getByRole('button', { name: new RegExp(today) }));

    // Then clear the selection
    const clearButton = screen.getByRole('button', { name: /clear dates/i });
    fireEvent.click(clearButton);

    expect(mockSetFormData).toHaveBeenCalledWith([]);
  });

  // Additional tests can be added for error handling and submission logic
});
