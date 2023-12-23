import ListItemText from '@mui/material/ListItemText';
import { type Theme } from '@mui/material/styles';
import { type SxProps } from '@mui/system';

interface BulletedListItemProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export default function BulletedListItem({ children, sx }: BulletedListItemProps) {
  return (
    <li>
      <ListItemText sx={{ display: 'list-item', ...sx }}>{children}</ListItemText>
    </li>
  );
}

BulletedListItem.defaultProps = {
  sx: {},
};
