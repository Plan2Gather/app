import { Link, Typography } from '@mui/material';

import BulletedList from '@/app/components/shared/bulleted-list/bulleted-list';
import BulletedListItem from '@/app/components/shared/bulleted-list/bulleted-list-item/bulleted-list-item';
import { type GatheringListResponseData } from '@backend/types';

export interface GatheringListProps {
  gatherings: GatheringListResponseData | undefined;
}

export default function GatheringList({ gatherings }: GatheringListProps) {
  if (!gatherings || gatherings.length === 0) {
    return <Typography>No gatherings found</Typography>;
  }

  return (
    <BulletedList>
      {gatherings?.map(({ id, name }) => (
        <BulletedListItem key={id}>
          <Link href={`/gathering/${id}`}>{name}</Link>
        </BulletedListItem>
      ))}
    </BulletedList>
  );
}
