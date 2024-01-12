import { ListAlt } from '@mui/icons-material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

import type { Theme } from '@mui/material/styles';

export default function MyGatheringsButton({ variant }: { variant: 'toolbar' | 'homepage' }) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const route = '/my-gatherings';
  const icon = <ListAlt />;
  const isToolbar = variant === 'toolbar';
  const text = 'My Gatherings';

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
      data-testid="my-gatherings"
    >
      {text}
    </Button>
  );
}
