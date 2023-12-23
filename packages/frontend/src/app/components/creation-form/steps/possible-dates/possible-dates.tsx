import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from 'react';
import { FormContainer, ToggleButtonGroupElement, useForm } from 'react-hook-form-mui';

import { type Weekday, weekdays } from '@plan2gather/backend/types';
import { sortWeekdays } from '@plan2gather/backend/utils';

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
        formContext.handleSubmit(
          (data) => {
            if (!data.possibleDates?.length) {
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
        );
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
