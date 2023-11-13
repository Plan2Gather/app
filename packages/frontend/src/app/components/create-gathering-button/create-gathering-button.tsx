import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups'; // or any other relevant icon

export default function CreateGatheringButton({
  size,
}: {
  size: 'icon' | 'large';
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const route = '/create';
  const icon = <GroupsIcon />;
  const isIcon = size === 'icon';
  const text = 'Plan a Gathering';

  if (isIcon) {
    return isMobile ? (
      <IconButton href={route} color="inherit">
        {icon}
      </IconButton>
    ) : (
      <Button href={route} startIcon={icon} variant="outlined">
        {text}
      </Button>
    );
  }

  return (
    <Button
      href={route}
      startIcon={(isMobile || size !== 'large') && icon}
      variant={size === 'large' ? 'contained' : 'outlined'}
    >
      {text}
    </Button>
  );
}
