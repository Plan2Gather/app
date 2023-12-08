// owned-meetings.spec.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { OwnedGatheringData } from '@plan2gather/backend/types';
import OwnedMeetings from './owned-meetings';

const defaultOwnedMeetingData: OwnedGatheringData = {
  id: '123',
  name: 'Test Meeting',
};

describe('OwnedMeetings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OwnedMeetings userId="test-user-id" />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a loading indicator when loading', () => {
    render(<OwnedMeetings userId="test-user-id" />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('should render an error message when there is an error', () => {
    render(<OwnedMeetings userId="test-user-id" />);
    expect(screen.getByText('Error loading meetings')).toBeTruthy();
  });

  it('should render a list of meetings', () => {
    render(<OwnedMeetings userId="test-user-id" />);
    expect(screen.getByText(defaultOwnedMeetingData.name)).toBeTruthy();
  });
});
