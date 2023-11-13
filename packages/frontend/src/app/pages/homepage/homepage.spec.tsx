import Homepage from './homepage';
import { renderWithTheme } from '../../../utils/theme-test-helper';

describe('Homepage', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithTheme(<Homepage />, {
      themeOptions: {},
      width: 1024,
    });
    expect(baseElement).toBeTruthy();
  });
});
