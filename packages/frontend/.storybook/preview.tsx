import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import { StoryFn } from '@storybook/react';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
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
