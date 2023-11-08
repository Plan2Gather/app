import React from 'react';
import ListItemText from '@mui/material/ListItemText';

interface BulletedListItemProps {
  children: React.ReactNode;
}

export default function BulletedListItem({ children }: BulletedListItemProps) {
  return <ListItemText sx={{ display: 'list-item' }}>{children}</ListItemText>;
}
