import { render } from '@testing-library/react';

import App from './app';

import indexeddb from 'fake-indexeddb';

globalThis.indexedDB = indexeddb;

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
