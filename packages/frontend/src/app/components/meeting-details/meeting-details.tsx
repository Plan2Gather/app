import React from 'react';
import { MeetingData } from "@plan2gather/backend/types";

/* eslint-disable-next-line */
export interface MeetingDetailsProps {
  meetingData: MeetingData;
}

export function MeetingDetails({ meetingData }: MeetingDetailsProps) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div> MeetingDetails 
      <h1>{meetingData.name}</h1>
      <p>{meetingData.description}</p>
      <p>Event Timezone: {meetingData.timezone}</p>
      <p>User Timezone: {userTimezone}</p>

    </div>

    // <div className={styles['container']}>
    //   <h1>{meetingData.name}</h1>
    //   <p>{meetingData.description}</p>
    //   <p>User Timezone: {meetingData.userTimezone}</p>
    //   <p>Event Timezone: {meetingData.eventTimezone}</p>
    // </div>
  );
}

export default MeetingDetails;
