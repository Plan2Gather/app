import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

const HeroLayoutRoot = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('xs')]: {
    height: '65vh',
    minHeight: 500,
    maxHeight: 1024,
  },
  [theme.breakpoints.up('sm')]: {
    height: '80vh',
    minHeight: 500,
    maxHeight: 1024,
  },
}));

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
});

interface HeroLayoutProps {
  sxBackground: SxProps<Theme>;
}

export default function HeroLayout(props: React.HTMLAttributes<HTMLDivElement> & HeroLayoutProps) {
  const { sxBackground, children } = props;

  return (
    <HeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.55,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
      </Container>
    </HeroLayoutRoot>
  );
}
