import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import GatheringList from '@/app/components/gathering-list/gathering-list';
import { trpc } from '@/trpc';

export default function MyGatherings() {
  const ownedGatheringsQuery = trpc.gatherings.getOwnedGatherings.useQuery();
  const participatingGatheringsQuery = trpc.gatherings.getParticipatingGatherings.useQuery();

  if (ownedGatheringsQuery.isLoading || participatingGatheringsQuery.isLoading) {
    return <CircularProgress />;
  }

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
          <GatheringList gatherings={ownedGatheringsQuery.data} />
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography component="h2" variant="h4">
            Participating Gatherings
          </Typography>
          <GatheringList gatherings={participatingGatheringsQuery.data} />
        </Grid>
      </Grid>
    </>
  );
}
