import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import GatheringView from './gathering-view';

describe('GatheringView', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<GatheringView />);
        expect(baseElement).toBeTruthy();
    });
});
