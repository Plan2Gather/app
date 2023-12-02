import { PossibleTimeData } from '@plan2gather/backend/types';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

export interface PossibleTimeProps {
  timeData: Pick<PossibleTimeData, 'id' | 'username' | 'time' | 'gatheringId'>;
}

export default function PossibleTime({
  timeData,
}: PossibleTimeProps) {
  return (
    <>

      <Typography variant="body2">
        Time Range: {timeData.time}
      </Typography>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

    </>
  );
}
