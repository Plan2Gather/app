import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Link, Typography } from '@mui/material';
import { useState } from 'react';

import DeleteGatheringDialog from '@/app/components/dialogs/details-edit/delete-gathering/delete-gathering';
import BulletedList from '@/app/components/shared/bulleted-list/bulleted-list';
import BulletedListItem from '@/app/components/shared/bulleted-list/bulleted-list-item/bulleted-list-item';
import { type GatheringListResponseData } from '@backend/types';

export interface GatheringListProps {
  gatherings: GatheringListResponseData | undefined;
}

export default function GatheringList({ gatherings }: GatheringListProps) {
  const [dialogState, setDialogState] = useState({ open: false, id: '' });
  if (gatherings == null || gatherings.length === 0) {
    return <Typography>No gatherings found</Typography>;
  }

  return (
    <>
      <BulletedList>
        {gatherings.map((gathering) => (
          <BulletedListItem key={gathering.id}>
            <>
              <Link href={`/gathering/${gathering.id}`}>{gathering.name}</Link>
              {gathering.editPerms && (
                <IconButton
                  aria-label="Delete gathering"
                  onClick={() => {
                    setDialogState({
                      open: true,
                      id: gathering.id,
                    });
                  }}
                  color="error"
                  sx={{ ml: 0.2 }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              )}
            </>
          </BulletedListItem>
        ))}
      </BulletedList>
      <DeleteGatheringDialog
        open={dialogState.open}
        id={dialogState.id}
        onClose={() => {
          setDialogState({ open: false, id: '' });
        }}
        navOnClose={false}
      />
    </>
  );
}
