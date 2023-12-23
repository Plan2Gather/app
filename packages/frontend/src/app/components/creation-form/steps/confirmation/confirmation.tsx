import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from 'react';
import GatheringDetails from '../../../gathering-details/gathering-details';
import { CreationStore } from '../../creation.store';

const ConfirmationStep = forwardRef<unknown, { initial: CreationStore }>(
  ({ initial }, ref) => {
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
  }
);

export default ConfirmationStep;
