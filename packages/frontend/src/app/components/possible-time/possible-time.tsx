import React, { useState, useEffect } from 'react';
import { PossibleTimeData } from '@plan2gather/backend/types';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AvatarGroup from '@mui/material/AvatarGroup';

export interface PossibleTimeProps {
  timeData: Pick<PossibleTimeData, 'id' |'startDatetime' | 'endDatetime' |'users' | 'gatheringId'>;
  users: string[];

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

export default function PossibleTime({ timeData}: PossibleTimeProps) {
  const { startDatetime, endDatetime } = timeData;
  const start = new Date(startDatetime);
  const end = new Date(endDatetime);
  const {users} = timeData;
  const maxAmt = 3;
  const [displayedUsers, setDisplayedUsers] = useState<string[]>([]);
  const [overflowUsers, setOverflowUsers] = useState<string[]>([]);

  useEffect(() => {
    setDisplayedUsers(users.slice(0, maxAmt));
    setOverflowUsers(users.slice(maxAmt));
  }, [users]);

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <div style={{ border: '1px solid gray', padding: '10px'}}>
    <Typography variant="body" sx={{ mb: 2 }}>
      {start.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
      {' @ '}
      {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      {' - '}
      {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </Typography>

    <AvatarGroup max={maxAmt}>
        {displayedUsers.map((user) => (
          <Tooltip title={user} key={user}>
            <Avatar {...stringAvatar(user)} />
          </Tooltip>
        ))}
      </AvatarGroup>
      {overflowUsers.length > 0 && (
        <Tooltip title={overflowUsers.join(', ')}>
          <Avatar>+{overflowUsers.length}</Avatar>
        </Tooltip>
      )}
    </div>
    </div>
  );
}
