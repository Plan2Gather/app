import { DateTime } from 'luxon';

import ConfirmationDialog from '@/app/components/dialogs/confirmation/confirmation';

export interface ConfirmTimezoneDialogProps {
  timezone: string;
  open: boolean;
  onClose: (confirmed: boolean) => void;
}

export default function ConfirmTimezoneDialog(props: ConfirmTimezoneDialogProps) {
  const { timezone, onClose, open } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    onClose(true);
  };

  return (
    <ConfirmationDialog
      dialogTitle="Verify Timezone"
      dialogText={`This gathering is happening in the ${timezone} timezone. You are currently in the ${
        DateTime.local().zoneName
      } timezone. Please confirm the times you have selected are in the ${timezone} timezone.`}
      buttonText="Confirm"
      loading={false}
      handleClick={handleConfirm}
      onClose={handleClose}
      open={open}
    />
  );
}
