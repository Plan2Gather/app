import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { DateTime } from 'luxon';

export interface ConfirmTimezoneDialogProps {
  timezone: string;
  open: boolean;
  onClose: (confirmed: boolean) => void;
}

export default function ConfirmTimezoneDialog(
  props: ConfirmTimezoneDialogProps
) {
  const { timezone, onClose, open } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    onClose(true);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl">
      <DialogTitle>Verify Timezone</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This gathering is happening in the {timezone} timezone. You are
          currently in the {DateTime.local().zoneName} timezone. Please confirm
          the times you have selected are in the {timezone} timezone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
