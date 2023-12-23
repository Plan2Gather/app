import { render, screen } from '@testing-library/react';

import BulletedList from './bulleted-list';
import BulletedListItem from './bulleted-list-item/bulleted-list-item';

describe('BulletedList', () => {
  it('should render list successfully', () => {
    render(
      <BulletedList>
        <BulletedListItem>Test</BulletedListItem>
      </BulletedList>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveStyle('list-style-type: disc');
    expect(list).toHaveStyle('padding-left: 20px');
  });
});
