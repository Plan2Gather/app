import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Layout from './layout';

describe('Layout', () => {
    beforeEach(() => {
        render(<Layout>Test</Layout>);
    });

    it('should render the app bar content', () => {
        const websiteTitle = screen.queryByTestId('website-title-link');
        expect(websiteTitle).toBeInTheDocument();
        expect(websiteTitle).toHaveAttribute('href', '/');
        expect(websiteTitle).toHaveTextContent('Plan2Gather');

        const nav = screen.queryByRole('navigation');
        expect(nav).toBeInTheDocument();

        const button = screen.queryByRole('link', { name: 'Plan a Gathering' });
        expect(button).toBeInTheDocument();
    });

    it('should render the children', () => {
        const children = screen.queryByText('Test');
        expect(children).toBeInTheDocument();
    });

    it('should render the footer content', () => {
        const footer = screen.queryByTestId('footer');
        expect(footer).toBeInTheDocument();
        // TODO: This can be improved by testing columns and links
    });

    it('should render the copyright', () => {
        expect(screen.queryByTestId('copyright')).toBeInTheDocument();
    });
});
