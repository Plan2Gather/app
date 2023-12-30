import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useCallback, useRef, useState } from 'react';

import DetailsStep from '@/app/components/creation-form/steps/details/details';
import { type SubmitFunction } from '@/app/components/creation-form/types';
import LoadingButton from '@/app/components/shared/buttons/loading/loading';
import { trpc } from '@/trpc';
import { type GatheringData, type GatheringFormDetails } from '@backend/types';

import DeleteGatheringDialog from './delete-gathering/delete-gathering';

export interface DetailsEditDialogProps {
  data: GatheringData;
  open: boolean;
  onClose: () => void;
}

export default function DetailsEditDialog(props: DetailsEditDialogProps) {
  const { data, onClose, open } = props;

  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
    onSuccess: async () => {
      await utils.gatherings.get.invalidate({ id: data.id });
      handleClose();
      setLoading(false);
    },
  });

  const handleSubmit = useCallback(async () => {
    const result = await formSubmitRef.current?.submit();
    if (result?.valid === true && result.data != null) {
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
    <>
      <Dialog
        onClose={() => {
          handleClose();
        }}
        open={open}
      >
        <DialogContent>
          <DetailsStep initial={details} ref={formSubmitRef} disableTimezoneEdit />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteOpen(true);
            }}
            disabled={loading}
            color="error"
            type="button"
            sx={{ marginRight: 'auto' }}
          >
            Delete Gathering
          </Button>
          <Button
            onClick={() => {
              handleClose();
            }}
            disabled={loading}
            type="button"
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={() => {
              void handleSubmit();
            }}
            loading={loading}
            type="submit"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <DeleteGatheringDialog
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
        }}
        id={data.id}
      />
    </>
  );
}
