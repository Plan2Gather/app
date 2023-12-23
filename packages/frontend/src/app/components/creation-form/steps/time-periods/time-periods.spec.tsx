import TimePeriodsStep from './time-periods';
import { renderWithTheme } from '../../../../../utils/theme-test-helper.spec';

describe('TimePeriodsStep', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithTheme(
      <TimePeriodsStep
        initial={{ friday: [{ start: '', end: '' }] }}
        days={['wednesday']}
        timezone="America/New_York"
      />,
      {}
    );
    expect(baseElement).toBeTruthy();
  });
});
