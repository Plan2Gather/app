import { render } from '@testing-library/react';

import StepperControls from './stepper-controls';

describe('StepperControls', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StepperControls />);
    expect(baseElement).toBeTruthy();
  });
});
