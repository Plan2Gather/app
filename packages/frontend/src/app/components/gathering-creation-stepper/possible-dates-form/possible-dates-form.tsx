import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { forwardRef, useState } from 'react';
import { ScheduleType } from '@plan2gather/backend/types';
import DayOfWeekPicker from './day-of-week-picker/day-of-week-picker';
import { FormStepProps } from '../types';
import type { Weekday } from '../../../../utils/utils';

export interface PossibleDateSelection {
  type: ScheduleType;
  data: Weekday[];
}

const PossibleDates = forwardRef<unknown, FormStepProps<PossibleDateSelection>>(
  ({ formData, onSuccessfulSubmit }, ref) => {
    const [selectedScheduleType, setSelectedScheduleType] =
      useState<ScheduleType>(formData?.type || 'dayOfWeek');

    const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<string[]>(
      formData?.type === 'dayOfWeek' ? (formData.data as string[]) : []
    );

    // const [selectedDates, setSelectedDates] = useState<DateTime[]>(
    //   formData?.type === 'date' ? (formData.data as DateTime[]) : []
    // );

    const pickerElement = {
      dayOfWeek: (
        <DayOfWeekPicker
          formData={selectedDaysOfWeek}
          setFormData={setSelectedDaysOfWeek}
          ref={ref}
          onSuccessfulSubmit={(data) => {
            onSuccessfulSubmit({ type: 'dayOfWeek', data: data as Weekday[] });
          }}
        />
      ),
      date: (
        // <MultiDatePicker
        //   formData={selectedDates}
        //   setFormData={setSelectedDates}
        //   ref={ref}
        //   onSuccessfulSubmit={(data) => {
        //     onSuccessfulSubmit({ type: 'date', data });
        //   }}
        // />
        <Typography>Not Implemented Yet</Typography>
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
            <FormControlLabel
              value="date"
              control={<Radio />}
              label="Date"
              disabled
            />
          </RadioGroup>
        </FormControl>
        {pickerElement[selectedScheduleType]}
      </>
    );
  }
);

export default PossibleDates;
