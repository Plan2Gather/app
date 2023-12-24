import { BrowserRouter } from 'react-router-dom';

import { TRPCWrapper } from '@/utils/test-utils';
import { renderWithTheme } from '@/utils/theme-test-helper.spec';

import CreationStepper from './stepper';

describe('CreationStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithTheme(
      <BrowserRouter>
        <TRPCWrapper>
          <CreationStepper />
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
