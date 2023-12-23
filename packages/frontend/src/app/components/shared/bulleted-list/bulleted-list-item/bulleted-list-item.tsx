import ListItemText from '@mui/material/ListItemText';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface BulletedListItemProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export default function BulletedListItem({
  children,
  sx,
}: BulletedListItemProps) {
  return (
    <li>
      <ListItemText sx={{ display: 'list-item', ...sx }}>
        {children}
      </ListItemText>
    </li>
  );
}

BulletedListItem.defaultProps = {
  sx: {},
};
