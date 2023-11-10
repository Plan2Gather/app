import { ReactNode, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  GlobalStyles,
  Link,
  Toolbar,
  Typography,
  TypographyOwnProps,
  responsiveFontSizes,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CreateMeetingButton from '../create-meeting-button/create-meeting-button';

function Copyright(props: TypographyOwnProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
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
      { text: 'Getting Started Guide', link: '/guide' },
      {
        text: 'Source Code on GitHub',
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
  children: ReactNode;
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
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
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
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Link href="/" underline="none" color="inherit">
                Plan2Gather
              </Link>
            </Typography>
            <nav>
              <Link
                variant="button"
                color="text.primary"
                href="/guide"
                sx={{ mx: 1.5 }}
              >
                Help
              </Link>
            </nav>
            <CreateMeetingButton />
          </Toolbar>
        </AppBar>
        {/* End Header */}
        {/* Main */}
        <Container
          maxWidth="md"
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
            maxWidth="md"
            component="footer"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              py: [1.5, 1.5],
            }}
          >
            <Grid container spacing={2} justifyContent="space-evenly">
              {footers.map((footer) => (
                <Grid xs={4} sm={3} key={footer.title}>
                  <Typography variant="h6" gutterBottom>
                    {footer.title}
                  </Typography>
                  <ul>
                    {footer.description.map((item) => (
                      <li key={item.text}>
                        <Link
                          href={item.link}
                          variant="subtitle1"
                          color="text.secondary"
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Box>
        {/* End footer */}
      </Box>
    </ThemeProvider>
  );
}
