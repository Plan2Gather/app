import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/utils/theme-test-helper.spec';

import CreateGatheringButton from './create-gathering';

interface ButtonConfig {
  variant: 'toolbar' | 'homepage';
  width: number;
}

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
