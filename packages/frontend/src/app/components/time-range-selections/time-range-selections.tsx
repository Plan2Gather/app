import { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import { v4 as uuidv4 } from 'uuid';
import { Weekday } from '@plan2gather/backend/types';
import TimeRangePicker from './time-range-picker/time-range-picker';
import useGatheringStepperFormData from '../gathering-creation-stepper/gathering-creation.store';

type TimeRangeSelectionsProps = {
  day: Weekday;
};

function TimeRangeSelections({ day }: TimeRangeSelectionsProps) {
  const store = useGatheringStepperFormData();

  const [timePeriods, setTimePeriods] = useState<{ id: string }[]>([]);

  const addTimePeriod = useCallback(() => {
    setTimePeriods((prev) => [
      ...prev,
      {
        id: uuidv4(),
      },
    ]);
  }, []);

  const removeTimePeriod = useCallback((id: string) => {
    setTimePeriods((prev) => prev.filter((range) => range.id !== id));
  }, []);

  return (
    <>
      <Stack spacing={1}>
        {timePeriods.map((range, index) => (
          <TimeRangePicker
            key={range.id}
            namePrefix={`${day}_${index}`}
            timezone={store.details!.timezone}
            onRemove={() => removeTimePeriod(range.id)}
          />
        ))}
      </Stack>
      <IconButton size="large" onClick={() => addTimePeriod()}>
        <AddCircleIcon fontSize="inherit" />
      </IconButton>
    </>
  );
}

export default TimeRangeSelections;
