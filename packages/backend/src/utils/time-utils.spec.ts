import { DateTime } from 'luxon';

import { type DateRange, type Weekday } from '../types';

import { mergeDateRanges, sortWeekdays } from './time-utils'; // Adjust the import path

describe('time-utils', () => {
  describe('sortWeekdays', () => {
    it('should sort weekdays correctly', () => {
      const unsortedWeekdays: Weekday[] = [
        'tuesday',
        'monday',
        'sunday',
        'wednesday',
      ];
      const sortedWeekdays: Weekday[] = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
      ];
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
});
