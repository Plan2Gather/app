import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import LoadingButton from '@/app/components/shared/buttons/loading/loading';

import type { ButtonProps } from '@mui/material/Button';

interface ConfirmationDialogProps {
  open: boolean;
  loading: boolean;
  dialogTitle: string;
  dialogText: string;
  buttonText: string;
  buttonColor?: ButtonProps['color'];
  handleClick: () => void;
  onClose: () => void;
}

export default function ConfirmationDialog({
  open,
  loading,
  dialogTitle,
  dialogText,
  buttonText,
  buttonColor,
  handleClick,
  onClose,
}: ConfirmationDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle id="confirmation-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading} type="button">
          Cancel
        </Button>
        <LoadingButton onClick={handleClick} loading={loading} color={buttonColor} type="submit">
          {buttonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.defaultProps = {
  buttonColor: undefined,
};
