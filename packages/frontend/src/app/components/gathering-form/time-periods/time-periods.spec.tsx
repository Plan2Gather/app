import TimePeriods from './time-periods';
import { renderWithTheme } from '../../../../utils/theme-test-helper.spec';

describe('TimePeriods', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithTheme(
      <TimePeriods
        initial={{ friday: [{ start: '', end: '' }] }}
        days={['wednesday']}
        timezone="America/New_York"
      />,
      {}
    );
    expect(baseElement).toBeTruthy();
  });
});
