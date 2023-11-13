import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import MultiDatePicker from './multi-date-picker/multi-date-picker';
import DayOfWeekPicker from './day-of-week-picker/day-of-week-picker';
import { FormStepProps } from '../types';

export interface PossibleDateSelection {
  type: 'dayOfWeek' | 'date';
  data: string[] | DateTime[];
}

export default function PossibleDates({
  formData,
  setSubmitRef,
  onSuccessfulSubmit,
}: FormStepProps<PossibleDateSelection>) {
  const [selectedScheduleType, setSelectedScheduleType] = useState<
    'dayOfWeek' | 'date'
  >(formData?.type || 'dayOfWeek');

  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<string[]>(
    formData?.type === 'dayOfWeek' ? (formData.data as string[]) : []
  );

  const [selectedDates, setSelectedDates] = useState<DateTime[]>(
    formData?.type === 'date' ? (formData.data as DateTime[]) : []
  );

  const pickerElement = useMemo(() => {
    switch (selectedScheduleType) {
      case 'dayOfWeek':
        return (
          <DayOfWeekPicker
            formData={selectedDaysOfWeek}
            setFormData={setSelectedDaysOfWeek}
            setSubmitRef={setSubmitRef}
            onSuccessfulSubmit={(data) => {
              onSuccessfulSubmit({ type: 'dayOfWeek', data });
            }}
          />
        );
      case 'date':
        return (
          <MultiDatePicker
            formData={selectedDates}
            setFormData={setSelectedDates}
            setSubmitRef={setSubmitRef}
            onSuccessfulSubmit={(data) => {
              onSuccessfulSubmit({ type: 'date', data });
            }}
          />
        );
      default:
        return undefined;
    }
  }, [
    selectedScheduleType,
    selectedDaysOfWeek,
    selectedDates,
    onSuccessfulSubmit,
    setSubmitRef,
  ]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        What days are best?
      </Typography>
      <FormControl>
        <FormLabel id="schedule-type-selector">Schedule Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="schedule-type-selector"
          value={selectedScheduleType}
          name="radio-buttons-group"
          onChange={(v) => {
            setSelectedScheduleType(v.target.value as 'dayOfWeek' | 'date');
          }}
        >
          <FormControlLabel
            value="dayOfWeek"
            control={<Radio />}
            label="Day of the week"
          />
          <FormControlLabel value="date" control={<Radio />} label="Date" />
        </RadioGroup>
      </FormControl>
      {pickerElement}
    </>
  );
}
