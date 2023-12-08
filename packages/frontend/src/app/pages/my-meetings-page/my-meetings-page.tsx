import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import { trpc } from '../../../trpc';
import MyMeetingsComponent from '../../components/my-meetings-component/my-meetings-component';

export default function MyMeetings() {
  const ownedMeetingsQuery = trpc.gatherings.getOwnedGatherings.useQuery();
  const participatingMeetingsQuery =
    trpc.gatherings.getParticipatingGatherings.useQuery();

  if (ownedMeetingsQuery.isLoading || participatingMeetingsQuery.isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography component="h1" variant="h3" gutterBottom>
        My Meetings
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <Typography component="h2" variant="h4">
            Owned Meetings
          </Typography>
          <MyMeetingsComponent meetings={ownedMeetingsQuery.data} />
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography component="h2" variant="h4">
            Participating Meetings
          </Typography>
          <MyMeetingsComponent meetings={participatingMeetingsQuery.data} />
        </Grid>
      </Grid>
    </>
  );
}
