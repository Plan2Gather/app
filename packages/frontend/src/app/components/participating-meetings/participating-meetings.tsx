// participating-meetings.tsx
import React from 'react';
import { trpc } from '../../../trpc';

export interface Meeting {
  id: string;
  title: string;
  // Add other properties as needed
}

export interface ParticipatingMeetingsProps {
  userId: string;
}

export default function ParticipatingMeetings({
  userId,
}: ParticipatingMeetingsProps) {
  const {
    data: meetings,
    error,
    isLoading,
  } = trpc.useQuery(['getParticipatingMeetings', { userId }]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !meetings) {
    return <div>Error loading meetings</div>;
  }

  return (
    <div>
      <h1>Participating Meetings</h1>
      {meetings.map((meeting: Meeting) => (
        <div key={meeting.id}>
          <h2>{meeting.title}</h2>
          {/* Display other meeting details here */}
        </div>
      ))}
    </div>
  );
}
