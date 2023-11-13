import { renderWithTheme } from '../../../utils/theme-test-helper';
import Creation from './gathering-creation';

describe('Gathering Creation', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithTheme(<Creation />, {
      themeOptions: {},
      width: 1024,
    });
    expect(baseElement).toBeTruthy();
  });
});
