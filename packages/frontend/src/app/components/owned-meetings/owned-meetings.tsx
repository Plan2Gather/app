// owned-meetings.tsx
import React from 'react';
import { trpc } from '../../../trpc';

export interface Meeting {
    id: string;
    title: string;
    // Add other properties as needed
}

export interface OwnedMeetingsProps {
    userId: string;
}

export default function OwnedMeetings({ userId }: OwnedMeetingsProps) {
    const { data: meetings, error, isLoading } = trpc.gatherings.useQuery(['getOwnedMeetings', { userId }]);
// TODO: FIX THIS
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error || !meetings) {
        return <div>Error loading meetings</div>;
    }

    return (
        <div>
            <h1>Owned Meetings</h1>
            {meetings.map((meeting: Meeting) => (
                <div key={meeting.id}>
                    <h2>{meeting.title}</h2>
                    {/* Display other meeting details here */}
                </div>
            ))}
        </div>
    );
}