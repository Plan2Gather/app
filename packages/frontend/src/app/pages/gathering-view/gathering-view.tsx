import { Button, Divider, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import TimePeriodDialog from '@/app/components/dialogs/user-availability/user-availability';
import Filter from '@/app/components/filter/filter';
import GatheringDetails from '@/app/components/gathering-details/gathering-details';
import TimeGridWrapper from '@/app/components/time-grid/time-grid-wrapper';
import NotFound from '@/app/pages/not-found/not-found';
import { trpc } from '@/trpc';

import useGatheringViewData from './gathering-view.store';

export default function GatheringView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [myTimezone, setMyTimezone] = useState(false);
  const { id } = useParams();

  const { checkedUsers } = useGatheringViewData();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  // const handleTimezoneSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setMyTimezone(event.target.checked);
  // };

  if (id == null) {
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

  const isLoading = gathering.isLoading || fullAvailability.isLoading || ownAvailability.isLoading;

  const { data } = gathering;
  const fullAvailabilityData = fullAvailability.data;
  const ownAvailabilityData = ownAvailability.data === 'none' ? undefined : ownAvailability.data;

  let userLabels: string[] = [];

  if (!isLoading && fullAvailabilityData != null) {
    userLabels = fullAvailabilityData.map((a) => a.name);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (data == null) {
    return <NotFound />;
  }

  const userTimezone = DateTime.local().zoneName;
  // const timezone = myTimezone ? userTimezone : data.timezone;

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Gathering Information
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <GatheringDetails gatheringData={data} />
          <Button onClick={handleClickOpen} variant="outlined">
            {ownAvailabilityData != null ? 'Edit your Availability' : 'Submit your Availability'}
          </Button>
          {fullAvailabilityData != null && fullAvailabilityData.length > 0 && (
            <>
              {/* {data.timezone !== userTimezone && (
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
                </>
              )} */}
              <Divider sx={{ my: 1 }} />
              Required Attendance
              <Filter userLabels={userLabels} />
            </>
          )}
        </Grid>
        {fullAvailabilityData != null && fullAvailabilityData.length > 0 && (
          <Grid xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Availability
            </Typography>
            {data.timezone !== userTimezone && (
              <Typography variant="subtitle2" sx={{ color: 'warning.main' }} gutterBottom>
                The time grid is in the {data.timezone} timezone.
              </Typography>
            )}
            <TimeGridWrapper
              userAvailability={fullAvailabilityData}
              requiredUsers={checkedUsers}
              allUsers={userLabels}
              timezone={data.timezone}
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
