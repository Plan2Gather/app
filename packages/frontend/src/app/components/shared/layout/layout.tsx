import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Link from '@mui/material/Link';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Toolbar from '@mui/material/Toolbar';
import Typography, { type TypographyOwnProps } from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';

import BulletedList from '@/app/components/shared/bulleted-list/bulleted-list';
import BulletedListItem from '@/app/components/shared/bulleted-list/bulleted-list-item/bulleted-list-item';
import CreateGatheringButton from '@/app/components/shared/buttons/create-gathering/create-gathering';
import MyGatheringsButton from '@/app/components/shared/buttons/my-gatherings/my-gatherings';

function Copyright(props: TypographyOwnProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      data-testid="copyright"
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Plan2Gather
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const footers = [
  {
    title: 'About',
    description: [
      { text: 'Team', link: '/team' },
      { text: 'Contact us', link: '/contact' },
    ],
  },
  {
    title: 'Resources',
    description: [
      {
        text: 'Source code',
        link: 'https://github.com/cjlawson02/plan2gather',
      },
    ],
  },
  {
    title: 'Legal',
    description: [{ text: 'Privacy policy', link: '/privacy' }],
  },
];

/* eslint-disable-next-line */
export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mdTheme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        })
      ),
    [prefersDarkMode]
  );

  const { children } = props;

  return (
    <ThemeProvider theme={mdTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Header */}
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              <Link href="/" underline="none" color="inherit" data-testid="website-title-link">
                Plan2Gather
              </Link>
            </Typography>
            <nav>
              <Link variant="button" color="text.primary" href="/contact" sx={{ marginRight: 1.5 }}>
                Contact
              </Link>
            </nav>
            <Box mr={1}>
              <MyGatheringsButton variant="toolbar" />
            </Box>
            <CreateGatheringButton variant="toolbar" />
          </Toolbar>
        </AppBar>
        {/* End Header */}
        {/* Main */}
        <Container
          maxWidth="lg"
          sx={{
            paddingY: 1.5,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
          component="main"
        >
          {children}
        </Container>
        {/* End Main */}
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            mt: 'auto',
          }}
        >
          <Container
            maxWidth="lg"
            component="footer"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              py: [1.5, 1.5],
            }}
            data-testid="footer"
          >
            <Grid container spacing={2} justifyContent="space-evenly">
              {footers.map((footer) => (
                <Grid xs={6} sm={3} md={2} key={footer.title}>
                  <Typography component="h3" variant="h6">
                    {footer.title}
                  </Typography>
                  <BulletedList>
                    {footer.description.map((item) => (
                      <BulletedListItem key={item.text} sx={{ mt: 0, mb: 0 }}>
                        <Link href={item.link} variant="subtitle1" color="text.secondary">
                          {item.text}
                        </Link>
                      </BulletedListItem>
                    ))}
                  </BulletedList>
                </Grid>
              ))}
            </Grid>
            <Copyright sx={{ mt: 1 }} />
          </Container>
        </Box>
        {/* End footer */}
      </Box>
    </ThemeProvider>
  );
}
