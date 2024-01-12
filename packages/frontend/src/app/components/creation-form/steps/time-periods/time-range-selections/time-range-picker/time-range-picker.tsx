/* eslint-disable react/jsx-props-no-spreading */
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { TimePickerElement, type TimePickerElementProps } from 'react-hook-form-mui';

import type { DateRange } from '@backend/types';

interface TimeRangeProps {
  onRemove: () => void;
  restriction: DateRange | undefined;
  timezone: string | undefined;
  namePrefix: string;
}

export default function TimeRangePicker({
  onRemove,
  restriction,
  timezone,
  namePrefix,
}: TimeRangeProps) {
  const timeSteps = { hours: 1, minutes: 15 };

  const [startTime, setStartTime] = useState(null);

  const timePickerProps = (name: 'start' | 'end'): TimePickerElementProps => ({
    name: `${namePrefix}_${name}`,
    label: name === 'start' ? 'Start Time' : 'End Time',
    timeSteps,
    minutesStep: timeSteps.minutes,
    timezone,
    required: true,
    disableIgnoringDatePartForTimeValidation: true,
  });

  const startRestriction =
    restriction?.start != null ? DateTime.fromISO(restriction.start) : undefined;
  const endRestriction = restriction?.end != null ? DateTime.fromISO(restriction.end) : undefined;

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 310 }}>
      <IconButton size="large" onClick={onRemove}>
        <RemoveCircleIcon fontSize="inherit" />
      </IconButton>
      <TimePickerElement
        {...timePickerProps('start')}
        maxTime={endRestriction}
        minTime={startRestriction}
        onChange={setStartTime}
      />
      <Typography>&ndash;</Typography>
      <TimePickerElement {...timePickerProps('end')} minTime={startTime} maxTime={endRestriction} />
    </Stack>
  );
}
