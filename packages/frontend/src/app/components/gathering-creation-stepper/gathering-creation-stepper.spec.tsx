import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme } from '../../../utils/theme-test-helper.spec';
import GatheringCreationStepper from './gathering-creation-stepper';
import { TRPCWrapper } from '../../../utils/test-utils';

describe('GatheringCreationStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithTheme(
      <BrowserRouter>
        <TRPCWrapper>
          <GatheringCreationStepper />
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
