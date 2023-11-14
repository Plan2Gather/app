import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
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

  const pickerElement = {
    dayOfWeek: (
      <DayOfWeekPicker
        formData={selectedDaysOfWeek}
        setFormData={setSelectedDaysOfWeek}
        setSubmitRef={setSubmitRef}
        onSuccessfulSubmit={(data) => {
          onSuccessfulSubmit({ type: 'dayOfWeek', data });
        }}
      />
    ),
    date: (
      <MultiDatePicker
        formData={selectedDates}
        setFormData={setSelectedDates}
        setSubmitRef={setSubmitRef}
        onSuccessfulSubmit={(data) => {
          onSuccessfulSubmit({ type: 'date', data });
        }}
      />
    ),
  };

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
      {pickerElement[selectedScheduleType]}
    </>
  );
}
