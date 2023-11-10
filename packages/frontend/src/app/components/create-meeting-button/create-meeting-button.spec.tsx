import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import mediaQuery from 'css-mediaquery';
import CreateMeetingButton from './create-meeting-button';

// Create a matchMedia mock function using the helper you provided
function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => {
    const matches = mediaQuery.match(query, { width });
    // We create a dummy MediaQueryList object that includes all required properties.
    const mql: Partial<MediaQueryList> = {
      matches,
      media: query,
      onchange: null, // You can set this to a no-op function if needed
      addListener: () => {}, // Deprecated but included for completeness
      removeListener: () => {}, // Deprecated but included for completeness
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: (_: Event) => true,
    };
    return mql as MediaQueryList;
  };
}

interface RenderOptions {
  themeOptions: ThemeOptions;
  width: number;
}

// Helper function to wrap the component with a theme provider and specific breakpoint
function renderWithTheme(
  ui: ReactElement,
  { themeOptions, width }: RenderOptions
) {
  // This function will use the width to simulate the screen size
  window.matchMedia = createMatchMedia(width);

  const theme = createTheme(themeOptions);
  function Wrapper({ children }: { children: ReactElement }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
  return render(ui, { wrapper: Wrapper });
}

describe('CreateMeetingButton', () => {
  // Test for non-mobile screens
  it('renders outlined Button with text for non-mobile screens', () => {
    renderWithTheme(<CreateMeetingButton />, {
      themeOptions: {},
      width: 1024,
    }); // desktop screen width
    const button = screen.getByTestId('create-meeting-button');
    expect(button).toBeInTheDocument();
  });

  // Test for mobile screens
  it('renders IconButton for mobile screens', () => {
    renderWithTheme(<CreateMeetingButton />, {
      themeOptions: {},
      width: 320,
    }); // mobile screen width
    const iconButton = screen.getByTestId('create-meeting-icon-button');
    expect(iconButton).toBeInTheDocument();
  });
});
