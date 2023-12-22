import { useState } from 'react';
import { useNavigate } from 'react-router';
import { trpc } from '../../../trpc';
import ConfirmationDialog from '../confirmation-dialog/confirmation-dialog';

type DeleteGatheringDialogProps = {
  open: boolean;
  id: string;
  onClose: () => void;
};

export default function DeleteGatheringDialog({
  open,
  id,
  onClose,
}: DeleteGatheringDialogProps) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const utils = trpc.useUtils();
  const deleteAPI = trpc.gatherings.remove.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      utils.gatherings.get.invalidate({ id });
      utils.gatherings.getEditPermission.invalidate({ id });
      utils.gatherings.getOwnAvailability.invalidate({ id });
      utils.gatherings.getAvailability.invalidate({ id });
      utils.gatherings.getOwnedGatherings.invalidate();
      utils.gatherings.getParticipatingGatherings.invalidate();
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
