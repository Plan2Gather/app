import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import { trpc } from '../../../trpc';
import MyGatheringsComponent from '../../components/my-gatherings-component/my-gatherings-component';

export default function MyGatherings() {
  const ownedGatheringsQuery = trpc.gatherings.getOwnedGatherings.useQuery();
  const participatingGatheringsQuery =
    trpc.gatherings.getParticipatingGatherings.useQuery();

  if (
    ownedGatheringsQuery.isLoading ||
    participatingGatheringsQuery.isLoading
  ) {
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
          <MyGatheringsComponent gatherings={ownedGatheringsQuery.data} />
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography component="h2" variant="h4">
            Participating Gatherings
          </Typography>
          <MyGatheringsComponent
            gatherings={participatingGatheringsQuery.data}
          />
        </Grid>
      </Grid>
    </>
  );
}
