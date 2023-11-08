import React from 'react';
import List from '@mui/material/List';

interface BulletedListProps {
  children: React.ReactNode;
}

export default function BulletedList({ children }: BulletedListProps) {
  return (
    <List sx={{ listStyleType: 'disc', paddingLeft: '20px' }}>{children}</List>
  );
}
