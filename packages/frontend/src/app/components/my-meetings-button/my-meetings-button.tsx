import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups'; // or any other relevant icon
import { ListAlt } from '@mui/icons-material';

export default function MyMeetingsButton({
  variant,
}: {
  variant: 'toolbar' | 'homepage';
}) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const route = '/my-meetings';
  const icon = <ListAlt />;
  const isToolbar = variant === 'toolbar';
  const text = 'My Meetings';

  if (isToolbar) {
    return isMobile ? (
      <IconButton href={route} color="primary">
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
      startIcon={(isMobile || variant !== 'homepage') && icon}
      variant={variant === 'homepage' ? 'contained' : 'outlined'}
      data-testid="my-meetings-button"
    >
      {text}
    </Button>
  );
}
