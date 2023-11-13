import { render } from '@testing-library/react';
import Filter from './filter';
import '@testing-library/jest-dom';

describe('BulletedList', () => {
  it('should rendere', () => {
    const { baseElement } = render(<Filter />);
    expect(baseElement).toBeInTheDocument();
  });
});
