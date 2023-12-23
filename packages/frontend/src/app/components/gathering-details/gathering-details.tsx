import {
  GatheringData,
  GatheringFormDetails,
} from '@plan2gather/backend/types';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { trpc } from '../../../trpc';
import DetailsEditDialog from '../dialogs/details-edit/details-edit';

export interface GatheringDetailsProps {
  gatheringData: GatheringData | GatheringFormDetails;
}

export default function GatheringDetails({
  gatheringData,
}: GatheringDetailsProps) {
  const userTimezone = DateTime.local().zoneName;

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
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h5" component="h2">
          {gatheringData.name}
        </Typography>
        {canEdit && (
          <IconButton onClick={() => setOpenEdit(true)} aria-label="edit">
            <EditIcon />
          </IconButton>
        )}
      </Stack>
      <Typography variant="body1" gutterBottom>
        {gatheringData.description}
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2">
          Event Timezone: {gatheringData.timezone}
        </Typography>
        {gatheringData.timezone !== userTimezone && (
          <Typography variant="body2">Your Timezone: {userTimezone}</Typography>
        )}
      </Box>
      <DetailsEditDialog
        data={gatheringData as GatheringData}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
    </>
  );
}
