import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import {
  GatheringData,
  GatheringFormDetails,
} from '@plan2gather/backend/types';
import DetailsForm from '../../gathering-form/details-form/details-form';
import { trpc } from '../../../../trpc';
import { SubmitFunction } from '../../gathering-form/types';
import LoadingButton from '../../loading-button/loading-button';

export interface DetailsEditDialogProps {
  data: GatheringData;
  open: boolean;
  onClose: () => void;
}

export default function DetailsEditDialog(props: DetailsEditDialogProps) {
  const { data, onClose, open } = props;

  const [loading, setLoading] = useState(false);

  const formSubmitRef = useRef<{
    submit: SubmitFunction<GatheringFormDetails>;
  }>();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const utils = trpc.useUtils();

  const submitAPI = trpc.gatherings.putDetails.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      utils.gatherings.get.invalidate({ id: data.id });
      handleClose();
      setLoading(false);
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
        <DetailsForm
          initial={details}
          ref={formSubmitRef}
          disableTimezoneEdit
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} disabled={loading} type="button">
          Cancel
        </Button>
        <LoadingButton onClick={handleSubmit} loading={loading} type="submit">
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
