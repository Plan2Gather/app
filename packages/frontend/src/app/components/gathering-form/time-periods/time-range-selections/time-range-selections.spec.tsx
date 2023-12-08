import { render } from '@testing-library/react';
import { FormContainer } from 'react-hook-form-mui';

import TimeRangeSelections from './time-range-selections';

describe('TimeRangeSelections', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FormContainer>
        <TimeRangeSelections
          initial={{}}
          day="wednesday"
          allowMultiple={false}
          restriction={undefined}
          timezone="America/New_York"
        />
      </FormContainer>
    );
    expect(baseElement).toBeTruthy();
  });
});
