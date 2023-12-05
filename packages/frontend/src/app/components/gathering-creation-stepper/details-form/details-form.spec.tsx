import { render } from '@testing-library/react';

import DetailsForm from './details-form';

describe('DetailsForm', () => {
    it('should render successfully', () => {
        const mockOnSuccessfulSubmit = vi.fn();

        const { baseElement } = render(
            <DetailsForm
                formData={[]}
                onSuccessfulSubmit={mockOnSuccessfulSubmit}
            />
        );
        expect(baseElement).toBeTruthy();
    });
});
