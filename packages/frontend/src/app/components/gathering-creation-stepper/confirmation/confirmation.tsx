import Typography from '@mui/material/Typography';
import { GatheringFormData } from '@plan2gather/backend/types';
import { GatheringDetails } from '../../gathering-details/gathering-details';

interface ConfirmationProps {
  gatheringData: GatheringFormData;
}

export default function Confirmation({ gatheringData }: ConfirmationProps) {
  return (
    <>
      <Typography variant="h5">Confirm Gathering</Typography>
      <GatheringDetails gatheringData={gatheringData} />
    </>
  );
}
