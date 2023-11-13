import { renderWithTheme } from '../../../utils/theme-test-helper.spec';
import GatheringCreationStepper from './gathering-creation-stepper';

describe('GatheringCreationStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithTheme(<GatheringCreationStepper />, {
      themeOptions: {},
      width: 1024,
    });
    expect(baseElement).toBeTruthy();
  });
});
