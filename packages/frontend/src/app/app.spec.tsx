import { render } from '@testing-library/react';
import indexeddb from 'fake-indexeddb';

import App from './app';

globalThis.indexedDB = indexeddb;

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
