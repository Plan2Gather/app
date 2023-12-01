import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from 'react';
import GatheringDetails from '../../gathering-details/gathering-details';
import useGatheringStepperFormData from '../gathering-creation.store';

const Confirmation = forwardRef<unknown, unknown>((_none, ref) => {
  const { details } = useGatheringStepperFormData();

  useImperativeHandle(ref, () => ({
    submit: () => true,
  }));

  return (
    <>
      <Typography variant="h5">Confirm Gathering</Typography>
      <GatheringDetails
        gatheringData={{
          name: details?.name,
          description: details?.description,
          timezone: details?.timezone,
        }}
      />
    </>
  );
});

export default Confirmation;
