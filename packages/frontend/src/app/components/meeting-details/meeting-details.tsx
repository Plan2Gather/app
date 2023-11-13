import React from 'react';
import {GatheringFormDetails } from "@plan2gather/backend/types";
import Typography from '@mui/material/Typography'

/* eslint-disable-next-line */
export interface MeetingDetailsProps {
  meetingData: GatheringFormDetails;
}

export function MeetingDetails({meetingData}: MeetingDetailsProps) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <>
      <Typography variant="h4" component="h2">
        {meetingData.name}
      </Typography>
      <Typography variant="body1">
      {meetingData.description}
      </Typography>
      <Typography variant="body2">
        Event Timezone: {meetingData.timezone}
      </Typography>
      <Typography variant="body2">
        Your Timezone: {userTimezone}
      </Typography>
    </>
  );
}

export default MeetingDetails;
