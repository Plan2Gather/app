import React from 'react';
import { render, screen } from '@testing-library/react';
import { MyMeetings } from './my-meetings-page';

describe('MyMeetings', () => {
  it('renders without crashing', () => {
    render(<MyMeetings userId="test-user-id" />);
    // Add more tests here
  });
});
