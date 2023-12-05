import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Privacy from './privacy';

describe('Privacy', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Privacy />);
        expect(baseElement).toBeTruthy();

        expect(
            baseElement.querySelector('h1')?.textContent
        ).toMatchInlineSnapshot(`"Privacy Policy"`);
        expect(
            screen.queryByText('Last updated: November 03, 2023')
        ).toBeTruthy();
    });
});
