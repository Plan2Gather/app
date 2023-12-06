import { render } from '@testing-library/react';

import DetailsForm from './details-form';

describe('DetailsForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DetailsForm
        initial={{ name: 'test', timezone: 'America/Los_Angeles' }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
