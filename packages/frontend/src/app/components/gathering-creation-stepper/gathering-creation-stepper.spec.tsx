import { render } from '@testing-library/react';

import GatheringCreationStepper from './gathering-creation-stepper';

describe('GatheringCreationStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GatheringCreationStepper />);
    expect(baseElement).toBeTruthy();
  });
});
