import Typography from '@mui/material/Typography';
import { GatheringFormData } from '@plan2gather/backend/types';
import { useEffect } from 'react';
import GatheringDetails from '../../gathering-details/gathering-details';
import { FormStepProps } from '../types';

export default function Confirmation({
  formData,
  setSubmitRef,
  onSuccessfulSubmit,
}: FormStepProps<GatheringFormData>) {
  useEffect(() => {
    setSubmitRef(async () => onSuccessfulSubmit(formData!));
  }, [setSubmitRef, onSuccessfulSubmit, formData]);

  return (
    <>
      <Typography variant="h5">Confirm Gathering</Typography>
      <GatheringDetails gatheringData={formData!} />
    </>
  );
}
