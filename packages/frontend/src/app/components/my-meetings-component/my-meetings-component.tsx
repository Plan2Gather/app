// my-meetings-component.tsx
import React from 'react';
import { trpc } from '../../../trpc';

export interface MyMeetingsProps {
  meetings: string[] | undefined;
}

export default function MyMeetingsComponent({ meetings }: MyMeetingsProps) {
  return (
    <div>
      {meetings?.map((meetingId) => {
        const { data: meeting, error, isLoading } = trpc.gatherings.get.useQuery({ id: meetingId });

        if (isLoading) {
          return <div>Loading...</div>;
        }

        if (error || !meeting) {
          return <div>Error loading meeting info</div>;
        }

        // if empty, return no meetings found
        if (meetings.length === 0) {
          return <div>No meetings found</div>;
        }

        return <div key={meetingId}>{meeting.name}</div>;
      })}
    </div>
  );
}