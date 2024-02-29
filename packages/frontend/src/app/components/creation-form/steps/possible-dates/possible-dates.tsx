import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from 'react';
import { FormContainer, ToggleButtonGroupElement, useForm } from 'react-hook-form-mui';

import { weekdays } from '@backend/types';
import { sortWeekdays } from '@backend/utils';

import type { Weekday } from '@backend/types';

const PossibleDatesStep = forwardRef<unknown, { initial: Weekday[] }>(({ initial }, ref) => {
  const formContext = useForm<{ possibleDates: Weekday[] }>({
    defaultValues: {
      possibleDates: initial ?? [],
    },
  });

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isFormValid = await new Promise<{
        valid: boolean;
        data?: Weekday[];
      }>((resolve) => {
        void formContext.handleSubmit(
          (data) => {
            if (data.possibleDates?.length === 0) {
              resolve({ valid: false });
            } else {
              resolve({
                valid: true,
                data: sortWeekdays(data.possibleDates),
              });
            }
          },
          () => {
            resolve({ valid: false });
          }
        )();
      });

      return isFormValid;
    },
  }));

  const options = weekdays.map((day) => ({
    id: day,
    label: day.charAt(0),
  }));

  return (
    <>
      <Typography variant="h5" gutterBottom>
        What days are best?
      </Typography>
      <FormContainer formContext={formContext}>
        <ToggleButtonGroupElement
          name="possibleDates"
          label="Days of the Week"
          helperText="Select days of the week that would work for the gathering"
          options={options}
          required
        />
      </FormContainer>
    </>
  );
});

PossibleDatesStep.displayName = 'PossibleDatesStep';

export default PossibleDatesStep;
