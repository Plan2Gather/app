// my-meetings-component.tsx
import React from 'react';
import { Link, Typography } from '@mui/material';
import { trpc } from '../../../trpc';
import BulletedList from '../bulleted-list/bulleted-list';
import BulletedListItem from '../bulleted-list/bulleted-list-item/bulleted-list-item';

export interface MyMeetingsProps {
  meetings: string[] | undefined;
}

export default function MyMeetingsComponent({ meetings }: MyMeetingsProps) {
  return (
    <BulletedList>
      {meetings?.map((meetingId) => {
        const {
          data: meeting,
          error,
          isLoading,
        } = trpc.gatherings.get.useQuery({ id: meetingId });

        if (isLoading) {
          return <Typography>Loading...</Typography>;
        }

        if (error || !meeting) {
          return <Typography>Error loading meeting info</Typography>;
        }

        // if empty, return no meetings found
        if (meetings.length === 0) {
          return <Typography>No meetings found</Typography>;
        }
        return (
          <BulletedListItem key={meetingId}>
            <Link href={`/gathering/${meetingId}`}>{meeting.name}</Link>
          </BulletedListItem>
        );
      })}
    </BulletedList>
  );
}
