import { render } from '@testing-library/react';

import Filter from './filter';

describe('Filter', () => {
  it('should render', () => {
    const mockData = ['test1', 'test2', 'test3'];
    const { baseElement } = render(<Filter userLabels={mockData} />);
    expect(baseElement).toBeInTheDocument();
  });
});
