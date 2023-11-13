import { render } from '@testing-library/react';

import PossibleDatesForm from './possible-dates-form';

describe('PossibleDatesForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PossibleDatesForm />);
    expect(baseElement).toBeTruthy();
  });
});
