// my-gatherings-component.tsx
import React from 'react';
import { Link, Typography } from '@mui/material';
import { trpc } from '../../../trpc';
import BulletedList from '../bulleted-list/bulleted-list';
import BulletedListItem from '../bulleted-list/bulleted-list-item/bulleted-list-item';

export interface MyGatheringsProps {
  gatherings: string[] | undefined;
}

export default function MyGatheringsComponent({
  gatherings,
}: MyGatheringsProps) {
  return (
    <BulletedList>
      {gatherings?.map((gatheringId) => {
        const {
          data: gathering,
          error,
          isLoading,
        } = trpc.gatherings.get.useQuery({ id: gatheringId });

        if (isLoading) {
          return <Typography>Loading...</Typography>;
        }

        if (error || !gathering) {
          return <Typography>Error loading gathering info</Typography>;
        }

        // if empty, return no gatherings found
        if (gatherings.length === 0) {
          return <Typography>No gatherings found</Typography>;
        }
        return (
          <BulletedListItem key={gatheringId}>
            <Link href={`/gathering/${gatheringId}`}>{gathering.name}</Link>
          </BulletedListItem>
        );
      })}
    </BulletedList>
  );
}
