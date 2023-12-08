// get-meeting-info.tsx
import React from 'react';
import { trpc } from '../../../trpc';

export interface GetMeetingInfoProps {
    meetingId: string;
}

export default function GetMeetingInfo({ meetingId }: GetMeetingInfoProps) {
    const { data: meeting, error, isLoading } = trpc.gatherings.get.useQuery({ id: meetingId });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error || !meeting) {
        return <div>Error loading meeting info</div>;
    }

    return (
        <div>
            <h1>{meeting.name}</h1>
            <p>{meeting.description}</p>
            {/* Display other meeting details here */}
        </div>
    );
}