// participating-meetings.spec.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ParticipatingMeetings from './participating-meetings';

describe('ParticipatingMeetings', () => {
    it('renders without crashing', () => {
        render(<ParticipatingMeetings userId="test-user-id" />);
        // Add more tests here
    });
});