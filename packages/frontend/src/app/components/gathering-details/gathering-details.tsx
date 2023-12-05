import { GatheringData } from '@plan2gather/backend/types';
import Typography from '@mui/material/Typography';

export interface GatheringDetailsProps {
    gatheringData: Pick<GatheringData, 'name' | 'description' | 'timezone'>;
}

export default function GatheringDetails({
    gatheringData,
}: GatheringDetailsProps) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return (
        <>
            <Typography variant="h4" component="h2">
                {gatheringData.name}
            </Typography>
            <Typography variant="body1">{gatheringData.description}</Typography>
            <Typography variant="body2">
                Event Timezone: {gatheringData.timezone}
            </Typography>
            <Typography variant="body2">
                Your Timezone: {userTimezone}
            </Typography>
        </>
    );
}
