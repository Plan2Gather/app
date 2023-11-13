import { render } from '@testing-library/react';

import DetailsForm from './details-form';

describe('DetailsForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailsForm />);
    expect(baseElement).toBeTruthy();
  });
});
