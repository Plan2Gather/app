import { Box, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';

import type { DateRange } from '@backend/types';

export interface TimePopoverProps {
  dateRange: DateRange;
  users: string[];
  timezone: string;
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

export default function TimePopover({ dateRange, users, timezone }: TimePopoverProps) {
  const { start, end } = dateRange;
  const startDate = DateTime.fromISO(start).setZone(timezone);
  const endDate = DateTime.fromISO(end).setZone(timezone);
  const maxAmt = 3;
  const [displayedUsers, setDisplayedUsers] = useState<string[]>([]);
  const [overflowUsers, setOverflowUsers] = useState<string[]>([]);

  useEffect(() => {
    setDisplayedUsers(users.slice(0, maxAmt));
    setOverflowUsers(users.slice(maxAmt));
  }, [users]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Paper
        sx={{
          padding: '10px',
        }}
      >
        <Typography variant="body1">
          {startDate.weekdayLong}
          {' @ '}
          {startDate.toFormat('t')}
          {' - '}
          {startDate.weekdayLong !== endDate.weekdayLong ? `${endDate.weekdayLong} @ ` : ''}
          {endDate.toFormat('t')}
        </Typography>
        <Typography variant="subtitle2">{timezone}</Typography>

        <AvatarGroup max={maxAmt}>
          {displayedUsers.map((user) => (
            <Tooltip title={user} key={user}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Avatar {...stringAvatar(user)} />
            </Tooltip>
          ))}
        </AvatarGroup>
        {overflowUsers.length > 0 && (
          <Tooltip title={overflowUsers.join(', ')}>
            <Avatar>+{overflowUsers.length}</Avatar>
          </Tooltip>
        )}
      </Paper>
    </Box>
  );
}
