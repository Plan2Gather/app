import { useState } from 'react';

import ConfirmationDialog from '@/app/components/dialogs/confirmation/confirmation';
import { trpc } from '@/trpc';

interface LeaveGatheringDialogProps {
  open: boolean;
  id: string;
  onClose: (didLeave: boolean) => void;
}

export default function LeaveGatheringDialog({ open, id, onClose }: LeaveGatheringDialogProps) {
  const [loading, setLoading] = useState(false);

  const utils = trpc.useUtils();
  const leaveAPI = trpc.gatherings.leaveGathering.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async () => {
      await utils.gatherings.get.invalidate({ id });
      await utils.gatherings.getOwnAvailability.invalidate({ id });
      await utils.gatherings.getAvailability.invalidate({ id });
      await utils.gatherings.getParticipatingGatherings.invalidate();
      onClose(true);
      setLoading(false);
    },
  });

  const handleLeave = () => {
    leaveAPI.mutate({ id });
  };

  return (
    <ConfirmationDialog
      dialogTitle="Leave Gathering"
      dialogText="Are you sure you want to leave this gathering?"
      buttonText="Leave Gathering"
      buttonColor="error"
      handleClick={handleLeave}
      loading={loading}
      onClose={() => {
        onClose(false);
      }}
      open={open}
    />
  );
}
