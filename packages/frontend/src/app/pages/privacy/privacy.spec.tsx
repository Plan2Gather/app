import { render, screen } from '@testing-library/react';

import Privacy from './privacy';

describe('Privacy', () => {
  it('should render successfully', () => {
    render(<Privacy />);

    const heading = screen.getByRole('heading', { name: 'Privacy Policy' });
    expect(heading).toBeInTheDocument();

    const lastUpdated = screen.getByText('Last updated: November 03, 2023');
    expect(lastUpdated).toBeInTheDocument();
  });
});
