import { render } from '@testing-library/react';

import TimeRangeSelections from './time-range-selections';

describe('TimeRangeSelections', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TimeRangeSelections
        initial={{}}
        day="wednesday"
        allowMultiple={false}
        restriction={undefined}
        timezone="America/New_York"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
