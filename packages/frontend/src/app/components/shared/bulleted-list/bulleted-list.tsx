import List from '@mui/material/List';

import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

interface BulletedListProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function BulletedList({ children, sx }: BulletedListProps) {
  return <List sx={{ listStyleType: 'disc', paddingLeft: '20px', ...sx }}>{children}</List>;
}

BulletedList.defaultProps = {
  sx: {},
};
