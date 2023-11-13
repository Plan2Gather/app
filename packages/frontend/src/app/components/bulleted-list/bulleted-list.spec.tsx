import { render } from '@testing-library/react';
import BulletedList from './bulleted-list';
import BulletedListItem from './bulleted-list-item';
import '@testing-library/jest-dom';

describe('BulletedList', () => {
  it('should render item successfully', () => {
    const { baseElement } = render(<BulletedListItem>Test</BulletedListItem>);
    expect(baseElement).toBeInTheDocument();
  });

  it('should render list successfully', () => {
    const { baseElement } = render(
      <BulletedList>
        <BulletedListItem>Test</BulletedListItem>
      </BulletedList>
    );
    expect(baseElement).toBeInTheDocument();

    const list = baseElement.querySelector('ul');
    expect(list).toBeTruthy();
    expect(list).toHaveStyle('list-style-type: disc');
    expect(list).toHaveStyle('padding-left: 20px');
  });
});
