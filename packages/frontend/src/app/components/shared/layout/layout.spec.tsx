import { render, screen } from '@testing-library/react';

import Layout from './layout';

describe('Layout', () => {
  it('should render the app bar content', () => {
    render(<Layout>Test</Layout>);
    const websiteTitle = screen.getByTestId('website-title-link');
    expect(websiteTitle).toBeInTheDocument();
    expect(websiteTitle).toHaveAttribute('href', '/');
    expect(websiteTitle).toHaveTextContent('Plan2Gather');

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Plan a Gathering' })).toBeInTheDocument();
  });

  it('should render the children', () => {
    render(<Layout>Test</Layout>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render the footer content', () => {
    render(<Layout>Test</Layout>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    // TODO: This can be improved by testing columns and links
  });

  it('should render the copyright', () => {
    render(<Layout>Test</Layout>);
    expect(screen.getByTestId('copyright')).toBeInTheDocument();
  });
});
