import { render } from '@testing-library/react';

import MeetingCreationForm from './meeting-creation-form';

describe('MeetingCreationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MeetingCreationForm />);
    expect(baseElement).toBeTruthy();
  });
});
