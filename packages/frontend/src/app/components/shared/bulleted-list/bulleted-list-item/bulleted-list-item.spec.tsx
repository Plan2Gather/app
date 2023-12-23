import { render } from '@testing-library/react';
import BulletedListItem from './bulleted-list-item';
import '@testing-library/jest-dom';

describe('BulletedListItem', () => {
  it('should render item successfully', () => {
    const { baseElement } = render(<BulletedListItem>Test</BulletedListItem>);
    expect(baseElement).toBeInTheDocument();
  });
});
