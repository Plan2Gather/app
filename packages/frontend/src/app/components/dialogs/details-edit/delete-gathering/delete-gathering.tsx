import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmationDialog from '@/app/components/dialogs/confirmation/confirmation';
import { trpc } from '@/trpc';

interface DeleteGatheringDialogProps {
  open: boolean;
  id: string;
  onClose: () => void;
}

export default function DeleteGatheringDialog({ open, id, onClose }: DeleteGatheringDialogProps) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const utils = trpc.useUtils();
  const deleteAPI = trpc.gatherings.remove.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      // We don't await because the gathering is already deleted
      // The API will likely return an error
      void utils.gatherings.get.invalidate({ id });
      void utils.gatherings.getEditPermission.invalidate({ id });
      void utils.gatherings.getOwnAvailability.invalidate({ id });
      void utils.gatherings.getAvailability.invalidate({ id });
      void utils.gatherings.getOwnedGatherings.invalidate();
      void utils.gatherings.getParticipatingGatherings.invalidate();
      onClose();
      navigate('/my-gatherings');
      setLoading(false);
    },
  });

  const handleDelete = () => {
    deleteAPI.mutate({ id });
  };

  return (
    <ConfirmationDialog
      dialogTitle="Delete Gathering"
      dialogText="Are you sure you want to delete this gathering?"
      buttonText="Delete Gathering"
      buttonColor="error"
      handleClick={handleDelete}
      loading={loading}
      onClose={onClose}
      open={open}
    />
  );
}
