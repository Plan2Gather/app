import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';

import { FormStepProps } from '../../types';
import Utils from '../../../../../utils/utils';
import type { Weekday } from '../../../../../utils/utils';

interface DayOfWeekPickerProps extends FormStepProps<string[]> {
  setFormData: (data: string[]) => void;
}

export default function DayOfWeekPicker({
  formData,
  setFormData,
  setSubmitRef,
  onSuccessfulSubmit,
}: DayOfWeekPickerProps) {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newDays: Weekday[]
  ) => {
    setFormData(Utils.sortWeekdays(newDays));
  };
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

  const children = Utils.weekdays.map((day) => {
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    return (
      <ToggleButton value={day} key={day} aria-label={capitalizedDay}>
        {capitalizedDay[0]}
      </ToggleButton>
    );
  });

  return (
    <FormControl error={error} required>
      <FormLabel id="days-of-week-selector">Days of the Week</FormLabel>
      <ToggleButtonGroup
        value={formData}
        onChange={handleChange}
        aria-labelledby="days-of-week-selector"
      >
        {children}
      </ToggleButtonGroup>
      <FormHelperText>
        Select days of the week that would work for the gathering
      </FormHelperText>
    </FormControl>
  );
}
