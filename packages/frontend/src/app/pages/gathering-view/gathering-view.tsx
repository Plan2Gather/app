import { useState } from 'react';
import { useParams } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Divider, Stack, Switch, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DateTime } from 'luxon';
import GatheringDetails from '../../components/gathering-details/gathering-details';
import { trpc } from '../../../trpc';
import NotFound from '../not-found/not-found';
import Filter from '../../components/filter/filter';
import TimePeriodDialog from '../../components/gathering-user-availability-form/user-availability-dialog';
import TimeGridWrapper from '../../components/time-grid/time-grid-wrapper';

import useGatheringViewData from './gathering-view.store';

export default function GatheringView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [myTimezone, setMyTimezone] = useState(false);
  const { id } = useParams();

  const { checkedUsers } = useGatheringViewData();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleTimezoneSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyTimezone(event.target.checked);
  };

  if (!id) {
    return <NotFound />;
  }

  const gathering = trpc.gatherings.get.useQuery({
    id,
  });
  const ownAvailability = trpc.gatherings.getOwnAvailability.useQuery({
    id,
  });
  const fullAvailability = trpc.gatherings.getAvailability.useQuery({
    id,
  });

  const isLoading =
    gathering.isLoading ||
    fullAvailability.isLoading ||
    ownAvailability.isLoading;

  const { data } = gathering;
  const fullAvailabilityData = fullAvailability.data;
  const ownAvailabilityData =
    ownAvailability.data === 'none' ? undefined : ownAvailability.data;

  let userLabels: string[] = [];

  if (!isLoading && fullAvailabilityData) {
    userLabels = fullAvailabilityData.map((a) => a.name);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data) {
    return <NotFound />;
  }

  const timezone = myTimezone ? DateTime.local().zoneName : data.timezone;

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <GatheringDetails gatheringData={data!} />
          <Button onClick={handleClickOpen} variant="outlined">
            {ownAvailabilityData
              ? 'Edit your Availability'
              : 'Submit your Availability'}
          </Button>
          {fullAvailabilityData && fullAvailabilityData.length > 0 && (
            <>
              <Divider sx={{ my: 1 }} />
              Grid Timezone
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2">Event</Typography>
                <Switch
                  checked={myTimezone}
                  onChange={handleTimezoneSwitch}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography variant="subtitle2">Yours</Typography>
              </Stack>
              <Divider sx={{ my: 1 }} />
              Required Attendance
              <Filter userLabels={userLabels} />
            </>
          )}
        </Grid>
        {fullAvailabilityData && fullAvailabilityData.length > 0 && (
          <Grid xs={12} md={8}>
            <TimeGridWrapper
              userAvailability={fullAvailabilityData}
              requiredUsers={checkedUsers}
              allUsers={userLabels}
              timezone={timezone}
            />
          </Grid>
        )}
      </Grid>
      <TimePeriodDialog
        initial={ownAvailabilityData}
        gatheringData={data}
        open={dialogOpen}
        onClose={handleClose}
      />
    </>
  );
}
