import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme } from '../../../utils/theme-test-helper.spec';
import Creation from './gathering-creation';

import { TRPCWrapper } from '../../../utils/test-utils';

describe('Gathering Creation', () => {
    it('should render successfully', () => {
        const { baseElement } = renderWithTheme(
            <BrowserRouter>
                <TRPCWrapper>
                    <Creation />
                </TRPCWrapper>
            </BrowserRouter>,
            {
                themeOptions: {},
                width: 1024,
            }
        );
        expect(baseElement).toBeTruthy();
    });
});
