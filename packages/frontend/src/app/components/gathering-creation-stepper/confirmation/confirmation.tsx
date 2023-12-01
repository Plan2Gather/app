import Typography from '@mui/material/Typography';
import { GatheringFormData } from '@plan2gather/backend/types';
import { forwardRef, useImperativeHandle } from 'react';
import GatheringDetails from '../../gathering-details/gathering-details';
import { FormStepProps } from '../types';

const Confirmation = forwardRef<unknown, FormStepProps<GatheringFormData>>(
  ({ formData, onSuccessfulSubmit }, ref) => {
    useImperativeHandle(ref, () => ({
      submit: () => {
        onSuccessfulSubmit(formData!);
      },
    }));

    return (
      <>
        <Typography variant="h5">Confirm Gathering</Typography>
        <GatheringDetails gatheringData={formData!} />
      </>
    );
  }
);

export default Confirmation;
