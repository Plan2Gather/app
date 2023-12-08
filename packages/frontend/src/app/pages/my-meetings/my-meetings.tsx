import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { trpc } from '../utils/trpc';

export default function MyMeetings({ userId }) {
    const [ownedMeetings, setOwnedMeetings] = useState([]);
    const [participatingMeetings, setParticipatingMeetings] = useState([]);

    const ownedMeetingsQuery = trpc.gatherings.getOwnedGatherings.useQuery({ userId });
    const participatingMeetingsQuery = trpc.gatherings.getParticipatingGatherings.useQuery({ userId });

    useEffect(() => {
        if (ownedMeetingsQuery.data) {
            setOwnedMeetings(ownedMeetingsQuery.data);
        }
        if (participatingMeetingsQuery.data) {
            setParticipatingMeetings(participatingMeetingsQuery.data);
        }
    }, [ownedMeetingsQuery.data, participatingMeetingsQuery.data]);

    if (ownedMeetingsQuery.isLoading || participatingMeetingsQuery.isLoading) {
        return <CircularProgress />;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <h1>Owned Meetings</h1>
                {ownedMeetings.map((meeting) => (
                    <div key={meeting.id}>
                        <h2>{meeting.title}</h2>
                        {/* Display other meeting details here */}
                    </div>
                ))}
            </Grid>
            <Grid item xs={6}>
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