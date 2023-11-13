import { render } from '@testing-library/react';

import MeetingDetails from './meeting-details';

describe('MeetingDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MeetingDetails />);
    expect(baseElement).toBeTruthy();
  });
});
