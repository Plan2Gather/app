import { Box, Card, CardContent, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';

import type { GatheringFormDetails, GatheringData } from '@backend/types';

export interface GatheringDetailsProps {
  gatheringData: GatheringData | GatheringFormDetails;
}

export default function GatheringDetails({ gatheringData }: GatheringDetailsProps) {
  const userTimezone = DateTime.local().zoneName;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" component="h1" align="center">
          Event Details
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="h6">{gatheringData.name}</Typography>
        </Stack>
        <Typography variant="body1" gutterBottom>
          {gatheringData.description}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">Event Timezone: {gatheringData.timezone}</Typography>
          {gatheringData.timezone !== userTimezone && (
            <Typography variant="body2">Your Timezone: {userTimezone}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
