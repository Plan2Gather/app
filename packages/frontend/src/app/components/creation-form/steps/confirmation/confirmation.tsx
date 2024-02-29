import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from 'react';

import GatheringDetails from '@/app/components/gathering-details/gathering-details';

import type { CreationStore } from '@/app/components/creation-form/creation.store';

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
      <FormGroup>
        <FormControlLabel
          control={<Checkbox name="notifications" />}
          label="Want to receive notifications about this gathering?"
        />
      </FormGroup>
    </>
  );
});

ConfirmationStep.displayName = 'ConfirmationStep';

export default ConfirmationStep;
