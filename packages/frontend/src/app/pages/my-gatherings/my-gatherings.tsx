import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import GatheringList from '@/app/components/gathering-list/gathering-list';
import { trpc } from '@/trpc';

export default function MyGatherings() {
  const ownedGatheringsQuery = trpc.gatherings.getOwnedGatherings.useQuery();
  const participatingGatheringsQuery = trpc.gatherings.getParticipatingGatherings.useQuery();

  return (
    <>
      <Typography component="h1" variant="h3" gutterBottom>
        My Gatherings
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <Typography component="h2" variant="h4">
            Owned Gatherings
          </Typography>
          <Typography variant="body2" gutterBottom>
            Gatherings you have created
          </Typography>
          {ownedGatheringsQuery.isLoading ? (
            <CircularProgress />
          ) : (
            <GatheringList gatherings={ownedGatheringsQuery.data} />
          )}
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography component="h2" variant="h4">
            Participating Gatherings
          </Typography>
          <Typography variant="body2" gutterBottom>
            Gatherings you have previously submitted availability for
          </Typography>
          {participatingGatheringsQuery.isLoading ? (
            <CircularProgress />
          ) : (
            <GatheringList gatherings={participatingGatheringsQuery.data} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
