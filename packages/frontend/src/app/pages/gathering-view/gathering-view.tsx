import { useState } from 'react';
import { useParams } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import GatheringDetails from '../../components/gathering-details/gathering-details';
import { trpc } from '../../../trpc';
import NotFound from '../not-found/not-found';
import Filter from '../../components/filter/filter';
import TimePeriodDialog from '../../components/gathering-user-availability-form/user-availability-dialog';
import TimeGridWrapper from '../../components/time-grid/time-grid-wrapper';

import useGatheringViewData from './gathering-view.store';

export default function GatheringView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { id } = useParams();

  const { checkedUsers } = useGatheringViewData();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
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
        </Grid>
        {fullAvailabilityData && (
          <>
            <Grid xs={12} md={5}>
              <TimeGridWrapper
                userAvailability={fullAvailabilityData}
                requiredUsers={checkedUsers}
                allUsers={userLabels}
                timezone={data.timezone}
              />
            </Grid>
            <Grid xs={12} md={3}>
              Required Attendance
              <Filter userLabels={userLabels} />
            </Grid>
          </>
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
