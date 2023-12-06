import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useCallback, useRef } from 'react';
import {
  GatheringData,
  GatheringFormDetails,
} from '@plan2gather/backend/types';
import DetailsForm from '../../gathering-form/details-form/details-form';
import { trpc } from '../../../../trpc';
import { SubmitFunction } from '../../gathering-form/types';

export interface DetailsEditDialogProps {
  data: GatheringData;
  open: boolean;
  onClose: () => void;
}

export default function DetailsEditDialog(props: DetailsEditDialogProps) {
  const { data, onClose, open } = props;

  const formSubmitRef = useRef<{
    submit: SubmitFunction<GatheringFormDetails>;
  }>();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const utils = trpc.useUtils();

  const submitAPI = trpc.gatherings.putDetails.useMutation({
    onSuccess: () => {
      utils.gatherings.get.invalidate({ id: data.id });
      handleClose();
    },
  });

  const handleSubmit = useCallback(async () => {
    const result = await formSubmitRef.current?.submit();
    if (result?.valid && result.data) {
      submitAPI.mutate({
        id: data.id,
        details: result.data,
      });
    }
  }, [data.id, submitAPI]);

  const details: GatheringFormDetails = {
    name: data.name,
    description: data.description,
    timezone: data.timezone,
  };

  return (
    <Dialog onClose={() => handleClose()} open={open}>
      <DialogContent>
        <DetailsForm initial={details} ref={formSubmitRef} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} type="button">
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
