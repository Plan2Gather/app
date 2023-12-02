import { PossibleTimeData } from '@plan2gather/backend/types';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import AvatarGroup from '@mui/material/AvatarGroup';

export interface PossibleTimeProps {
  timeData: Pick<PossibleTimeData, 'id' | 'username' | 'time' | 'gatheringId'>;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const nameParts = name.split(' ');
  let initials;

  if (nameParts.length > 1) {
    // If the name has at least two parts, use the first letter of the first two parts
    initials = `${nameParts[0][0]}${nameParts[1][0]}`;
  } else {
    // If the name is a single word, use the first two letters of that word
    initials = nameParts[0].substring(0, 1);
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

export default function PossibleTime({ timeData }: PossibleTimeProps) {
  const users = ['Kent Dodds', 'John Smith', 'Jane Doe', 'Test', 'Hi'];
  const maxAmt = 4;
  return (
    <>
      <Typography variant="body2">Time Range: {timeData.time}</Typography>

      <AvatarGroup max={maxAmt}>
        {users.map((user) => (
          <Tooltip title={user} key={user}>
            <Avatar {...stringAvatar(user)} />
          </Tooltip>
        ))}
      </AvatarGroup>
    </>
  );
}
