import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { trpc } from '../../../trpc';

export default function MyMeetings() {
  const ownedMeetingsQuery = trpc.gatherings.getOwnedGatherings.useQuery();
  const participatingMeetingsQuery =
    trpc.gatherings.getParticipatingGatherings.useQuery();

  if (ownedMeetingsQuery.isLoading || participatingMeetingsQuery.isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <h1>Owned Meetings</h1>
        <OwnedMeetings meetings={ownedMeetingsQuery.data} />
      </Grid>
      <Grid xs={6}>
        <h1>Participating Meetings</h1>
        {participatingMeetings.map((meeting) => (
          <div key={meeting.id}>
            <h2>{meeting.title}</h2>
            {/* Display other meeting details here */}
          </div>
        ))}
      </Grid>
    </Grid>
  );
}
