/* eslint-disable react/jsx-props-no-spreading */
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import { DateTime } from 'luxon';
import { TimePickerElement, TimePickerElementProps } from 'react-hook-form-mui';

export type DateRangeLuxon = {
  start: DateTime | null;
  end: DateTime | null;
  id: string;
};

interface TimeRangeProps {
  index: number;
  range: DateRangeLuxon;
  onRemove: () => void;
  onUpdate: (updatedRange: DateRangeLuxon) => void;
}

export default function TimeRangePicker({
  index,
  range,
  onRemove,
  onUpdate,
}: TimeRangeProps) {
  const timeSteps = { hours: 1, minutes: 15 };

  // Local handlers for updating the start and end times
  const handleStartTimeChange = (newValue: DateTime | null) => {
    onUpdate({ ...range, start: newValue });
  };

  const handleEndTimeChange = (newValue: DateTime | null) => {
    onUpdate({ ...range, end: newValue });
  };

  const timePickerProps = (name: 'start' | 'end'): TimePickerElementProps => ({
    name: `${name}_${index}`,
    label: name === 'start' ? 'Start Time' : 'End Time',
    timeSteps,
    minutesStep: timeSteps.minutes,
    onChange: (newValue: DateTime | null) => {
      if (name === 'start') {
        handleStartTimeChange(newValue);
      } else {
        handleEndTimeChange(newValue);
      }
    },
    required: index === 0,
  });

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: 'center', minWidth: 310 }}
    >
      <IconButton size="large" onClick={onRemove}>
        <RemoveCircleIcon fontSize="inherit" />
      </IconButton>
      <TimePickerElement {...timePickerProps('start')} />
      <Typography>&ndash;</Typography>
      <TimePickerElement {...timePickerProps('end')} minTime={range.start} />
    </Stack>
  );
}
