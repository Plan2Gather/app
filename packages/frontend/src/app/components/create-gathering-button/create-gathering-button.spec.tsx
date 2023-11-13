import { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import mediaQuery from 'css-mediaquery';
import CreateGatheringButton from './create-gathering-button';

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

type ButtonConfig = {
  variant: 'toolbar' | 'homepage';
  width: number;
};

describe('CreateGatheringButton', () => {
  const themeOptions = {}; // define your theme options here
  const testCases = [
    { variant: 'toolbar', width: 500 }, // Mobile, Toolbar
    { variant: 'toolbar', width: 1024 }, // Desktop, Toolbar
    { variant: 'homepage', width: 500 }, // Mobile, Homepage
    { variant: 'homepage', width: 1024 }, // Desktop, Homepage
  ] as ButtonConfig[];

  testCases.forEach(({ variant, width }) => {
    it(`should render correctly for ${variant} variant on ${
      width < 600 ? 'mobile' : 'desktop'
    }`, () => {
      renderWithTheme(<CreateGatheringButton variant={variant} />, {
        themeOptions,
        width,
      });
      const button = screen.getByRole('link');
      expect(button).toBeInTheDocument();

      expect(button).toHaveAttribute('href', '/create');

      if (variant === 'toolbar' && width < 600) {
        expect(button).toHaveClass('MuiIconButton-root');
      } else if (variant === 'toolbar' && width >= 600) {
        expect(button).toHaveClass('MuiButton-root');
        expect(button).toHaveClass('MuiButton-outlined');
      } else if (variant === 'homepage' && width < 600) {
        expect(button).toHaveClass('MuiButton-root');
        expect(button).toHaveClass('MuiButton-contained');
      } else if (variant === 'homepage' && width >= 600) {
        expect(button).toHaveClass('MuiButton-root');
        expect(button).toHaveClass('MuiButton-contained');
      } else {
        fail('Invalid variant');
      }
    });
  });
});
