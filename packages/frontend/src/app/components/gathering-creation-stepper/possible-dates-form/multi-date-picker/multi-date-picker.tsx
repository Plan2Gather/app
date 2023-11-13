import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Unstable_Grid2';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';
import { FormStepProps } from '../../types';

interface CustomDayProps extends PickersDayProps<DateTime> {
  // eslint-disable-next-line react/require-default-props
  selectedDay?: DateTime[] | null;
}

function CustomDay({ selectedDay, day, ...other }: CustomDayProps) {
  const isSelected =
    selectedDay?.some((selectedDate) => selectedDate.hasSame(day, 'day')) ??
    false;

  // Apply custom styles if 'isSelected' is true
  return (
    <PickersDay
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      day={day}
      selected={isSelected}
      data-testid={`day-${day.toISODate()}`}
    />
  );
}

interface MultiDatePickerProps extends FormStepProps<DateTime[]> {
  setFormData: (data: DateTime[]) => void;
}

export default function MultiDatePicker({
  formData,
  setFormData,
  setSubmitRef,
  onSuccessfulSubmit,
}: MultiDatePickerProps) {
  const shiftKeyPressed = useRef(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    setSubmitRef(async () => {
      // Check if the user has selected any days
      if (!formData || formData?.length === 0) {
        setError(true);
      } else {
        setError(false);
        onSuccessfulSubmit(formData);
      }
    });
  }, [setSubmitRef, formData, onSuccessfulSubmit]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        shiftKeyPressed.current = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        shiftKeyPressed.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const clearDates = () => {
    setFormData([]);
  };

  const handleDateChange = (date: DateTime | null) => {
    if (!date) return;

    const isShiftPressed = shiftKeyPressed.current;

    // Common sort function
    const sortDates = (dates: DateTime[]) =>
      dates.sort((a, b) => a.toMillis() - b.toMillis());

    if (isShiftPressed && formData && formData.length > 0) {
      // Shift-click logic for range selection
      const [startDate, endDate] = sortDates([formData[0], date]);
      const newDates = [];

      for (let d = startDate; d <= endDate; d = d.plus({ days: 1 })) {
        if (!formData.some((selectedDate) => selectedDate.equals(d))) {
          newDates.push(d);
        }
      }

      setFormData(sortDates([...new Set([...formData, ...newDates])]));
    } else {
      if (!formData) {
        setFormData([date]);
        return;
      }
      setFormData(
        sortDates(
          formData?.some((d) => d.equals(date))
            ? formData.filter((d) => !d.equals(date))
            : [...formData, date]
        )
      );
    }
  };

  return (
    <FormControl error={error} required>
      <FormLabel>Select Dates</FormLabel>
      <Card>
        <Grid container direction={{ xs: 'column-reverse', sm: 'row' }}>
          <Grid>
            <DateCalendar
              sx={{ margin: 0 }}
              onChange={handleDateChange}
              minDate={DateTime.local().startOf('day')}
              slots={{ day: CustomDay }}
              slotProps={
                {
                  day: { selectedDay: formData },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any
              }
            />
          </Grid>
          <Grid>
            <Button variant="outlined" onClick={clearDates} sx={{ m: '13px' }}>
              Clear Dates
            </Button>
          </Grid>
        </Grid>
      </Card>
      <FormHelperText>
        Select dates that would work for the gathering. Shift click for a range.
      </FormHelperText>
    </FormControl>
  );
}
