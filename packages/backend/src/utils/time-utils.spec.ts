import { DateTime } from 'luxon';

import { flattenDateRanges, isRangeWithinRange, mergeDateRanges, sortWeekdays } from './time-utils';

import type { DateRange, Weekday } from '@backend/types';

describe('time-utils', () => {
  describe('sortWeekdays', () => {
    it('should sort weekdays correctly', () => {
      const unsortedWeekdays: Weekday[] = ['tuesday', 'monday', 'sunday', 'wednesday'];
      const sortedWeekdays: Weekday[] = ['sunday', 'monday', 'tuesday', 'wednesday'];
      expect(sortWeekdays(unsortedWeekdays)).toEqual(sortedWeekdays);
    });
  });

  describe('mergeDateRanges', () => {
    const createDate = (hour: number) => DateTime.fromObject({ hour }).toISO()!;
    it('should merge two ranges when the second overlaps the end of the first', () => {
      const dateRanges: DateRange[] = [
        {
          start: createDate(9),
          end: createDate(15),
        },
        {
          start: createDate(14),
          end: createDate(18),
        },
      ];

      const result = mergeDateRanges(dateRanges);
      expect(result).toEqual([
        {
          start: createDate(9),
          end: createDate(18),
        },
      ]);
    });

    it('should merge two ranges when the second overlaps the start of the first', () => {
      const dateRanges: DateRange[] = [
        {
          start: createDate(12),
          end: createDate(18),
        },
        {
          start: createDate(10),
          end: createDate(13),
        },
      ];

      const result = mergeDateRanges(dateRanges);
      expect(result).toEqual([
        {
          start: createDate(10),
          end: createDate(18),
        },
      ]);
    });

    it('should merge two ranges when the second is contained within the first', () => {
      const dateRanges: DateRange[] = [
        {
          start: createDate(9),
          end: createDate(18),
        },
        {
          start: createDate(11),
          end: createDate(15),
        },
      ];

      const result = mergeDateRanges(dateRanges);
      expect(result).toEqual([
        {
          start: createDate(9),
          end: createDate(18),
        },
      ]);
    });

    it('should handle non-overlapping ranges', () => {
      const dateRanges: DateRange[] = [
        {
          start: createDate(8),
          end: createDate(10),
        },
        {
          start: createDate(11),
          end: createDate(13),
        },
      ];

      const result = mergeDateRanges(dateRanges);
      expect(result).toEqual(dateRanges);
    });
  });

  describe('flattenDateRanges', () => {
    it('should flatten date ranges correctly', () => {
      const dateRanges: DateRange[] = [
        {
          start: '2022-01-01T09:00:00.000Z',
          end: '2022-01-01T15:00:00.000Z',
        },
        {
          start: '2022-01-01T14:00:00.000Z',
          end: '2022-01-01T18:00:00.000Z',
        },
      ];

      const result = flattenDateRanges(dateRanges);
      expect(result).toEqual({
        start: '2022-01-01T09:00:00.000Z',
        end: '2022-01-01T18:00:00.000Z',
      });
    });
  });

  describe('isRangeWithinRange', () => {
    it('should return true when the range is within the restriction', () => {
      const range: DateRange = {
        start: '2022-01-01T09:00:00.000Z',
        end: '2022-01-01T15:00:00.000Z',
      };
      const restriction: DateRange = {
        start: '2022-01-01T08:00:00.000Z',
        end: '2022-01-01T16:00:00.000Z',
      };
      expect(isRangeWithinRange(range, restriction)).toBe(true);
    });

    it('should return false when the range is not within the restriction', () => {
      const range: DateRange = {
        start: '2022-01-01T09:00:00.000Z',
        end: '2022-01-01T15:00:00.000Z',
      };
      const restriction: DateRange = {
        start: '2022-01-01T16:00:00.000Z',
        end: '2022-01-01T18:00:00.000Z',
      };
      expect(isRangeWithinRange(range, restriction)).toBe(false);
    });

    it('should return true when the range is equal to the restriction', () => {
      const range: DateRange = {
        start: '2022-01-01T09:00:00.000Z',
        end: '2022-01-01T15:00:00.000Z',
      };
      const restriction: DateRange = {
        start: '2022-01-01T09:00:00.000Z',
        end: '2022-01-01T15:00:00.000Z',
      };
      expect(isRangeWithinRange(range, restriction)).toBe(true);
    });

    it('should return false when the range overlaps the start of the restriction', () => {
      const range: DateRange = {
        start: '2022-01-01T08:00:00.000Z',
        end: '2022-01-01T15:00:00.000Z',
      };
      const restriction: DateRange = {
        start: '2022-01-01T09:00:00.000Z',
        end: '2022-01-01T16:00:00.000Z',
      };
      expect(isRangeWithinRange(range, restriction)).toBe(false);
    });

    it('should return false when the range overlaps the end of the restriction', () => {
      const range: DateRange = {
        start: '2022-01-01T09:00:00.000Z',
        end: '2022-01-01T16:00:00.000Z',
      };
      const restriction: DateRange = {
        start: '2022-01-01T08:00:00.000Z',
        end: '2022-01-01T15:00:00.000Z',
      };
      expect(isRangeWithinRange(range, restriction)).toBe(false);
    });
  });
});
