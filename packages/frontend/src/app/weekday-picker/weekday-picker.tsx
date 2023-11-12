import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';

export default function WeekdayPicker() {
  const [daysOfWeek, setDaysOfWeek] = useState(() => [] as number[]);

  const handleDays = (_: MouseEvent<HTMLElement>, newDays: number[]) => {
    setDaysOfWeek(newDays);
  };

  return (
    <>
      <Typography variant="h5">Select days of the week</Typography>
      <ToggleButtonGroup
        value={daysOfWeek}
        onChange={handleDays}
        aria-label="Days of the week"
      >
        <ToggleButton value={0} aria-label="Sunday">
          S
        </ToggleButton>
        <ToggleButton value={1} aria-label="Monday">
          M
        </ToggleButton>
        <ToggleButton value={2} aria-label="Tuesday">
          T
        </ToggleButton>
        <ToggleButton value={3} aria-label="Wednesday">
          W
        </ToggleButton>
        <ToggleButton value={4} aria-label="Thursday">
          T
        </ToggleButton>
        <ToggleButton value={5} aria-label="Friday">
          F
        </ToggleButton>
        <ToggleButton value={6} aria-label="Saturday">
          S
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
