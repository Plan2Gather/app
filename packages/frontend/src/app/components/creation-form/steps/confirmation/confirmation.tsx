import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from 'react';

import { type CreationStore } from '@/app/components/creation-form/creation.store';
import GatheringDetails from '@/app/components/gathering-details/gathering-details';

const ConfirmationStep = forwardRef<unknown, { initial: CreationStore }>(({ initial }, ref) => {
  useImperativeHandle(ref, () => ({
    submit: () => ({
      valid: true,
    }),
  }));

  const { details } = initial;

  return (
    <>
      <Typography variant="h5">Confirm Gathering</Typography>
      <GatheringDetails gatheringData={details!} />
    </>
  );
});

ConfirmationStep.displayName = 'ConfirmationStep';

export default ConfirmationStep;
