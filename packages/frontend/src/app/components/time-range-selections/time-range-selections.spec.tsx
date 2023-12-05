import { render } from '@testing-library/react';

import TimeRangeSelections from './time-range-selections';

describe('TimeRangeSelections', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TimeRangeSelections />);
        expect(baseElement).toBeTruthy();
    });
});
