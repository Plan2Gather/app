import { BrowserRouter } from 'react-router-dom';

import { TRPCWrapper } from '../../../utils/test-utils';
import { renderWithTheme } from '../../../utils/theme-test-helper.spec';

import Creation from './gathering-creation';

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
