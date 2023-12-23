import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../../utils/theme-test-helper.spec';

import Homepage from './homepage';

describe('Homepage', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithTheme(<Homepage />, {
      themeOptions: {},
      width: 1024,
    });
    expect(baseElement).toBeTruthy();

    // Expect title, subtitle, and button to be rendered
    expect(screen.getByText('Plan2Gather')).toBeInTheDocument();
    expect(screen.getByText('Discover the lightning-speed hangout harmonizer')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Plan a Gathering' })).toBeInTheDocument();
  });
});
