import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from 'react';
import {
  FormContainer,
  ToggleButtonGroupElement,
  useForm,
} from 'react-hook-form-mui';
import type { Weekday } from '../../../../utils/utils';
import useGatheringStepperFormData from '../gathering-creation.store';
import Utils from '../../../../utils/utils';

const PossibleDates = forwardRef<unknown, unknown>((_none, ref) => {
  const store = useGatheringStepperFormData();

  const formContext = useForm<Weekday[]>({
    defaultValues: store.possibleDates ?? [],
  });

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isFormValid = await new Promise((resolve) => {
        formContext.handleSubmit(
          (data) => {
            store.setPossibleDates(data);
            resolve(true);
          },
          () => resolve(false)
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
