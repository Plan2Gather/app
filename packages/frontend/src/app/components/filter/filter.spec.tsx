import { render } from '@testing-library/react';
import Filter from './filter';
import '@testing-library/jest-dom';
import { GatheringData } from '@plan2gather/backend/types';

describe('Filter', () => {
  it('should render', () => {
    const mockData = {
      availability: {
        label1: true,
        label2: false,
        // Add more labels as needed
      },
    } as unknown as GatheringData;
    const { baseElement } = render(<Filter data={mockData} />);
    expect(baseElement).toBeInTheDocument();
  });
});
