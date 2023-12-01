import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import { useForm, FormContainer } from 'react-hook-form-mui';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import { Weekday } from '@plan2gather/backend/types';
import TimeRangePicker, {
  DateRangeLuxon,
} from './time-range-picker/time-range-picker';
import useGatheringStepperFormData from '../gathering-creation-stepper/gathering-creation.store';

type TimeRangeSelectionsProps = {
  day: Weekday;
};

const TimeRangeSelections = forwardRef<unknown, TimeRangeSelectionsProps>(
  ({ day }, ref) => {
    const store = useGatheringStepperFormData();

    const [timePeriods, setTimePeriods] = useState<DateRangeLuxon[]>(
      store.timePeriods[day] ?? []
    );

    const addTimePeriod = useCallback(() => {
      setTimePeriods((prev) => [
        ...prev,
        {
          start: null,
          end: null,
          id: uuidv4(),
        },
      ]);
    }, []);

    const removeTimePeriod = useCallback((id: string) => {
      setTimePeriods((prev) => prev.filter((range) => range.id !== id));
    }, []);

    const formContext = useForm<Record<string, DateTime>>({
      defaultValues: store.timePeriodsFormData?.[day] ?? {},
    });

    useEffect(() => {
      const values = formContext.watch();

      setTimePeriods((prevTimePeriods) =>
        prevTimePeriods.map((range, index) => {
          // Construct keys based on current index
          const startKey = `${day}_${index}_start`;
          const endKey = `${day}_${index}_end`;

          // New range object
          const newRange = { ...range };
          if (values[startKey]) {
            newRange.start = values[startKey];
          }
          if (values[endKey]) {
            newRange.end = values[endKey];
          }

          return newRange;
        })
      );
    }, [formContext, day]);

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isFormValid = await new Promise((resolve) => {
          formContext.handleSubmit(
            (data) => {
              store.setTimePeriodsForDay(day, timePeriods);
              store.setTimePeriodsFormData(day, data);
              resolve(true);
            },
            () => resolve(false)
          )();
        });

        return isFormValid;
      },
    }));

    return (
      <FormContainer formContext={formContext}>
        <Stack spacing={1}>
          {timePeriods.map((range, index) => (
            <TimeRangePicker
              key={range.id}
              namePrefix={`${day}_${index}`}
              range={range}
              timezone={store.details!.timezone}
              onRemove={() => removeTimePeriod(range.id)}
            />
          ))}
        </Stack>
        <IconButton size="large" onClick={() => addTimePeriod()}>
          <AddCircleIcon fontSize="inherit" />
        </IconButton>
      </FormContainer>
    );
  }
);

export default TimeRangeSelections;
