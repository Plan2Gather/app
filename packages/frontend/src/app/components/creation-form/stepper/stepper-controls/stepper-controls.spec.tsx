import { render } from '@testing-library/react';

import CreationStepperControls from './stepper-controls';

describe('CreationStepperControls', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreationStepperControls />);
    expect(baseElement).toBeTruthy();
  });
});
