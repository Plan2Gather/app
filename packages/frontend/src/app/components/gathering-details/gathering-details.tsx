import {
  GatheringData,
  GatheringFormDetails,
} from '@plan2gather/backend/types';
import Typography from '@mui/material/Typography';
import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { trpc } from '../../../trpc';
import DetailsEditDialog from './details-edit-dialog/details-edit-dialog';

export interface GatheringDetailsProps {
  gatheringData: GatheringData | GatheringFormDetails;
}

export default function GatheringDetails({
  gatheringData,
}: GatheringDetailsProps) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [openEdit, setOpenEdit] = useState(false);

  let canEdit = false;
  if ('id' in gatheringData) {
    canEdit =
      trpc.gatherings.getEditPermission.useQuery({
        id: gatheringData.id,
      }).data ?? false;
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Typography variant="h4" component="h2">
          {gatheringData.name}
        </Typography>
        {canEdit && (
          <IconButton onClick={() => setOpenEdit(true)} aria-label="edit">
            <EditIcon />
          </IconButton>
        )}
      </Stack>
      <Typography variant="body1">{gatheringData.description}</Typography>
      <Typography variant="body2">
        Event Timezone: {gatheringData.timezone}
      </Typography>
      <Typography variant="body2">Your Timezone: {userTimezone}</Typography>
      <DetailsEditDialog
        data={gatheringData as GatheringData}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
    </>
  );
}
