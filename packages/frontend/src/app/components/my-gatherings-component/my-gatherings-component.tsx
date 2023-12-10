// my-gatherings-component.tsx
import React from 'react';
import { Link, Typography } from '@mui/material';
import { GatheringListResponseData } from '@plan2gather/backend/types';
import BulletedList from '../bulleted-list/bulleted-list';
import BulletedListItem from '../bulleted-list/bulleted-list-item/bulleted-list-item';

export interface MyGatheringsProps {
  gatherings: GatheringListResponseData | undefined;
}

export default function MyGatheringsComponent({
  gatherings,
}: MyGatheringsProps) {
  return (
    <BulletedList>
      {gatherings?.map(({ id, name }) => {
        // if empty, return no gatherings found
        if (gatherings.length === 0) {
          return <Typography>No gatherings found</Typography>;
        }
        return (
          <BulletedListItem key={id}>
            <Link href={`/gathering/${id}`}>{name}</Link>
          </BulletedListItem>
        );
      })}
    </BulletedList>
  );
}
