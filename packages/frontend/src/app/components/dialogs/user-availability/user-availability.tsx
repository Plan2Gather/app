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
import { useRef, useState } from 'react';
import { DateTime } from 'luxon';
import TimePeriodsStep from '../../creation-form/steps/time-periods/time-periods';
import { SubmitFunction } from '../../creation-form/types';
import { trpc } from '../../../../trpc';
import ConfirmTimezoneDialog from './confirm-timezone/confirm-timezone';
import LeaveGatheringDialog from './leave-gathering/leave-gathering';
import LoadingButton from '../../shared/buttons/loading/loading';

export interface TimePeriodDialogProps {
  initial: UserAvailability | undefined;
  gatheringData: GatheringData;
  open: boolean;
  onClose: () => void;
}

export default function TimePeriodDialog(props: TimePeriodDialogProps) {
  const { gatheringData, onClose, open, initial } = props;

  const [confirmTimezoneOpen, setConfirmTimezoneOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const initialName = initial?.name ?? '';

  const utils = trpc.useUtils();

  const putAvailabilityAPI = trpc.gatherings.putAvailability.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      utils.gatherings.get.invalidate({ id: gatheringData.id });
      utils.gatherings.getAvailability.invalidate({ id: gatheringData.id });
      utils.gatherings.getOwnAvailability.invalidate({ id: gatheringData.id });
      utils.gatherings.getParticipatingGatherings.invalidate();
      setLoading(false);
      handleClose();
    },
  });

  const submitRef = useRef<{ submit: SubmitFunction<Availability> }>();

  const formContext = useForm<{ name: string }>({
    defaultValues: {
      name: initialName,
    },
  });

  const submitToAPI = async () => {
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

  const handleSubmit = async () => {
    if (gatheringData.timezone !== DateTime.local().zoneName) {
      setConfirmTimezoneOpen(true);
    } else {
      submitToAPI();
    }
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="xl">
        <DialogTitle>Set your availability</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Typography variant="subtitle2" gutterBottom>
              Treat all fields as public information. Do not include any
              personal information.
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
            <Typography
              variant="subtitle2"
              sx={{ color: 'warning.main' }}
              gutterBottom
            >
              Please enter your availability in the event timezone:{' '}
              {gatheringData.timezone}
            </Typography>
            <TimePeriodsStep
              initial={initial ? initial.availability : {}}
              restrictions={gatheringData.allowedPeriods}
              days={Object.keys(gatheringData.allowedPeriods) as Weekday[]}
              timezone={gatheringData.timezone}
              ref={submitRef}
              allowMultiple
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          {initial && (
            <Button
              onClick={() => setLeaveOpen(true)}
              disabled={loading}
              type="button"
              color="error"
              sx={{ mr: 'auto' }}
            >
              Leave Gathering
            </Button>
          )}
          <Button onClick={handleClose} disabled={loading} type="button">
            Cancel
          </Button>
          <LoadingButton onClick={handleSubmit} loading={loading} type="submit">
            Submit Availability
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <ConfirmTimezoneDialog
        timezone={gatheringData.timezone}
        open={confirmTimezoneOpen}
        onClose={(confirmed) => {
          setConfirmTimezoneOpen(false);
          if (confirmed) {
            submitToAPI();
          }
        }}
      />
      <LeaveGatheringDialog
        open={leaveOpen}
        onClose={(didLeave) => {
          setLeaveOpen(false);
          if (didLeave) {
            handleClose();
          }
        }}
        id={gatheringData.id}
      />
    </>
  );
}
