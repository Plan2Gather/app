import { render } from '@testing-library/react';
import BulletedList from './bulleted-list';
import BulletedListItem from './bulleted-list-item';

describe('BulletedList', () => {
  it('should render list successfully', () => {
    const { baseElement } = render(<BulletedList />);
    expect(baseElement).toBeTruthy();
  });

  it('should render item successfully', () => {
    const { baseElement } = render(<BulletedListItem />);
    expect(baseElement).toBeTruthy();
  });
});
