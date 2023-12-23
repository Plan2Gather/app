import { render } from '@testing-library/react';

import DetailsStep from './details';

describe('DetailsStep', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DetailsStep
        initial={{ name: 'test', timezone: 'America/Los_Angeles' }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
