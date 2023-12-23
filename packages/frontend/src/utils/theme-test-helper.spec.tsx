/* eslint-disable import/prefer-default-export */
import { type ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { match } from 'css-mediaquery';
import { type ReactElement } from 'react';

// Create a matchMedia mock function using the helper you provided
function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => {
    const matches = match(query, { width });
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
export function renderWithTheme(ui: ReactElement, { themeOptions, width }: RenderOptions) {
  // This function will use the width to simulate the screen size
  window.matchMedia = createMatchMedia(width);

  const theme = createTheme(themeOptions);
  function Wrapper({ children }: { children: ReactElement }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
  return render(ui, { wrapper: Wrapper });
}
