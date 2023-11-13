import React from 'react';
import List from '@mui/material/List';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface BulletedListProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function BulletedList({ children, sx }: BulletedListProps) {
  return (
    <List sx={{ listStyleType: 'disc', paddingLeft: '20px', ...sx }}>
      {children}
    </List>
  );
}

BulletedList.defaultProps = {
  sx: {},
};
