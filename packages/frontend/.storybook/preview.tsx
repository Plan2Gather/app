import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { type StoryFn } from '@storybook/react';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3367D6',
      },
    },
  })
);

export const withMuiTheme = (Story: StoryFn) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export const decorators = [withMuiTheme];
