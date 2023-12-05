import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import NotFound from './not-found';

describe('NotFound', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<NotFound />);
        expect(baseElement).toBeTruthy();

        expect(screen.queryByText('404 Not Found')).toBeInTheDocument();
        expect(
            screen.queryByText(
                'The requested page could not be found. Please check the URL and try again.'
            )
        ).toBeInTheDocument();
    });
});
