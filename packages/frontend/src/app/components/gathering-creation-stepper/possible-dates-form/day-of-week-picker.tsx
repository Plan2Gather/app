import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';

import { FormStepProps } from '../types';

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
    newDays: string[]
  ) => {
    setFormData(newDays);
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

  const children = [
    <ToggleButton value="sunday" key="sunday" aria-label="Sunday">
      S
    </ToggleButton>,
    <ToggleButton value="monday" key="monday" aria-label="Monday">
      M
    </ToggleButton>,
    <ToggleButton value="tuesday" key="tuesday" aria-label="Tuesday">
      T
    </ToggleButton>,
    <ToggleButton value="wednesday" key="wednesday" aria-label="Wednesday">
      W
    </ToggleButton>,
    <ToggleButton value="thursday" key="thursday" aria-label="Thursday">
      T
    </ToggleButton>,
    <ToggleButton value="friday" key="friday" aria-label="Friday">
      F
    </ToggleButton>,
    <ToggleButton value="saturday" key="saturday" aria-label="Saturday">
      S
    </ToggleButton>,
  ];

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
