import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import { FormContainer, useForm } from 'react-hook-form-mui';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TimeRangePicker, {
  DateRangeLuxon,
} from './time-range-picker/time-range-picker';

export default function TimeRangeSelections() {
  const formContext = useForm<DateRangeLuxon>();

  const [timeRanges, setTimeRanges] = useState<DateRangeLuxon[]>([]);

  const addTimeRange = () => {
    setTimeRanges([...timeRanges, { start: null, end: null, id: uuidv4() }]);
  };

  const removeTimeRange = (index: number) => {
    setTimeRanges(timeRanges.filter((_, i) => i !== index));
  };

  const updateTimeRange = (index: number, updatedRange: DateRangeLuxon) => {
    const updatedRanges = timeRanges.map((range, i) =>
      i === index ? updatedRange : range
    );
    setTimeRanges(updatedRanges);
  };

  return (
    <FormContainer formContext={formContext}>
      <Stack spacing={1}>
        {timeRanges.map((range, index) => (
          <TimeRangePicker
            key={range.id}
            index={index}
            range={range}
            onRemove={() => removeTimeRange(index)}
            onUpdate={(updatedRange) => updateTimeRange(index, updatedRange)}
          />
        ))}
      </Stack>
      <IconButton size="large" onClick={addTimeRange}>
        <AddCircleIcon fontSize="inherit" />
      </IconButton>
    </FormContainer>
  );
}
