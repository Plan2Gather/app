import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { trpc } from '../../../trpc';
import LoadingButton from '../loading-button/loading-button';

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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle id="delete-dialog-title">Delete Gathering</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this gathering?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading} type="button">
          Cancel
        </Button>
        <LoadingButton
          onClick={handleDelete}
          loading={loading}
          color="error"
          type="submit"
        >
          Delete Gathering
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
