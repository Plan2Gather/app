import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from '@mui/material';
import type {
  Availability,
  GatheringData,
  UserAvailability,
  Weekday,
} from '@plan2gather/backend/types';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import { useRef } from 'react';
import TimePeriods from '../gathering-form/time-periods/time-periods';
import { SubmitFunction } from '../gathering-form/types';
import { trpc } from '../../../trpc';

export interface TimePeriodDialogProps {
  initial: UserAvailability | undefined;
  gatheringData: GatheringData;
  open: boolean;
  onClose: () => void;
}

export default function TimePeriodDialog(props: TimePeriodDialogProps) {
  const { gatheringData, onClose, open, initial } = props;

  const handleClose = () => {
    onClose();
  };

  const initialName = initial?.name ?? '';

  const utils = trpc.useUtils();

  const putAvailabilityAPI = trpc.gatherings.putAvailability.useMutation({
    onSuccess: () => {
      utils.gatherings.get.invalidate({ id: gatheringData.id });
      utils.gatherings.getAvailability.invalidate({ id: gatheringData.id });
      utils.gatherings.getOwnAvailability.invalidate({ id: gatheringData.id });
      handleClose();
    },
  });

  const submitRef = useRef<{ submit: SubmitFunction<Availability> }>();

  const formContext = useForm<{ name: string }>({
    defaultValues: {
      name: initialName,
    },
  });

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleSubmit = async () => {
    const nameResult = await new Promise<{
      valid: boolean;
      data?: { name: string };
    }>((resolve) => {
      formContext.handleSubmit(
        (data) => {
          resolve({
            valid: true,
            data,
          });
        },
        () => resolve({ valid: false })
      )();
    });
    const timePeriodResult = await submitRef.current?.submit();

    if (
      timePeriodResult &&
      nameResult &&
      timePeriodResult.valid &&
      nameResult.valid &&
      nameResult.data &&
      timePeriodResult.data
    ) {
      putAvailabilityAPI.mutate({
        id: gatheringData.id,
        availability: {
          name: nameResult.data.name,
          availability: timePeriodResult.data,
        },
      });
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl">
      <DialogTitle>Set your availability</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography variant="subtitle2" gutterBottom>
            Treat all fields as public information. Do not include any personal
            information.
          </Typography>
          <FormContainer formContext={formContext}>
            <TextFieldElement
              label="Your name"
              name="name"
              helperText="Enter your name as you want it to appear to other participants."
              required
            />
          </FormContainer>
          <DialogContentText>
            Set your availability for the gathering. You can set multiple time
            periods for each day.
          </DialogContentText>
          <Typography variant="subtitle2" gutterBottom>
            Please enter your availability in your local timezone:{' '}
            {userTimezone}
          </Typography>
          <TimePeriods
            initial={initial ? initial.availability : {}}
            restrictions={gatheringData.allowedPeriods}
            days={Object.keys(gatheringData.allowedPeriods) as Weekday[]}
            timezone={userTimezone}
            ref={submitRef}
            allowMultiple
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Join Gathering</Button>
      </DialogActions>
    </Dialog>
  );
}
