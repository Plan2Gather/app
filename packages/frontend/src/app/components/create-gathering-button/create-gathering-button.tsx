import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups'; // or any other relevant icon

export default function CreateGatheringButton() {
  const theme = useTheme();
  // This will be true if the screen width is less than 'sm'
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const route = '/create';
  const icon = <GroupsIcon />;

  return isMobile ? (
    <IconButton
      href={route}
      color="inherit"
      data-testid="create-gathering-icon-button"
    >
      {icon}
    </IconButton>
  ) : (
    <Button
      href={route}
      variant="outlined"
      startIcon={icon}
      data-testid="create-gathering-button"
    >
      Plan a Gathering
    </Button>
  );
}
