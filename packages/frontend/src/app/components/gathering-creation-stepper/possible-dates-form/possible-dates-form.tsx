import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from 'react';
import {
  FormContainer,
  ToggleButtonGroupElement,
  useForm,
} from 'react-hook-form-mui';
import { Weekday } from '@plan2gather/backend/types';
import { GatheringStepperFormData } from '../gathering-creation.store';
import Utils from '../../../../utils/utils';

const PossibleDates = forwardRef<
  unknown,
  { initial: GatheringStepperFormData['possibleDates'] }
>(({ initial }, ref) => {
  const formContext = useForm<{ possibleDates: Weekday[] }>({
    defaultValues: {
      possibleDates: initial ?? [],
    },
  });

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isFormValid = await new Promise<{
        valid: boolean;
        data?: GatheringStepperFormData['possibleDates'];
      }>((resolve) => {
        formContext.handleSubmit(
          (data) => {
            resolve({ valid: true, data: data.possibleDates });
          },
          () => resolve({ valid: false })
        )();
      });

      return isFormValid;
    },
  }));

  const options = Utils.weekdays.map((day) => ({
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
        />
      </FormContainer>
    </>
  );
});

export default PossibleDates;
