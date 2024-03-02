import { DateTime } from 'luxon';

import { weekdays } from '@backend/types';

// eslint-disable-next-line import/no-cycle
import type { Availability, DateRange, DateRangeLuxon, Weekday } from '@backend/types';

export const sortWeekdays = (days: Weekday[]): Weekday[] =>
  days.sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));

export const timeOnly = (dateTime: DateTime): DateTime => {
  return DateTime.fromObject({
    hour: dateTime.hour,
    minute: dateTime.minute,
    second: dateTime.second,
  });
};

export const isDateWithinRangeLuxon = (date: DateTime, restriction: DateRangeLuxon) => {
  return (
    timeOnly(date) >= timeOnly(restriction.start) && timeOnly(date) <= timeOnly(restriction.end)
  );
};

/**
 * Checks if a given date is within a specified date range.
 * @param date - The date to check.
 * @param restriction - The date range to compare against.
 * @returns True if the date is within the range, false otherwise.
 */
export const isDateWithinRange = (date: DateTime, restriction: DateRange): boolean => {
  const start = DateTime.fromISO(restriction.start);
  const end = DateTime.fromISO(restriction.end);

  return isDateWithinRangeLuxon(date, { start, end });
};

/**
 * Checks if a given date range is within another date range.
 * @param range - The date range to check.
 * @param restriction - The date range to compare against.
 * @returns True if the range is within the restriction, false otherwise.
 */
export const isRangeWithinRange = (range: DateRange, restriction: DateRange): boolean => {
  return (
    isDateWithinRange(DateTime.fromISO(range.start), restriction) &&
    isDateWithinRange(DateTime.fromISO(range.end), restriction)
  );
};

/**
 * Merge overlapping date ranges
 * @param ranges - Date ranges to merge
 * @returns Merged date ranges
 */
export function mergeDateRanges(ranges: DateRange[]): DateRange[] {
  // Sort ranges by start date
  ranges.sort(
    (a, b) => DateTime.fromISO(a.start).toUnixInteger() - DateTime.fromISO(b.start).toUnixInteger()
  );

  const mergedRanges: DateRange[] = [];

  ranges.forEach((range) => {
    if (mergedRanges.length === 0) {
      mergedRanges.push(range);
    } else {
      const lastRange = mergedRanges[mergedRanges.length - 1];
      const lastRangeEnd = DateTime.fromISO(lastRange.end);
      if (lastRangeEnd >= DateTime.fromISO(range.start)) {
        // Create a new DateRange with updated end time if there is an overlap
        mergedRanges[mergedRanges.length - 1] = {
          start: lastRange.start,
          end: lastRangeEnd > DateTime.fromISO(range.end) ? lastRange.end : range.end,
        };
      } else {
        mergedRanges.push(range);
      }
    }
  });

  return mergedRanges;
}

/**
 * Consolidate availability by merging overlapping time ranges
 * @param availability - Availability to consolidate
 * @returns Consolidated availability
 */
export function consolidateAvailability(availability: Availability): Availability {
  const consolidatedAvailability: Availability = {};

  sortWeekdays(Object.keys(availability) as Array<keyof Availability>).forEach((day) => {
    const dayAvailability = availability[day as Weekday];
    if (dayAvailability != null) {
      const mergedRanges = mergeDateRanges(dayAvailability);
      consolidatedAvailability[day as Weekday] = mergedRanges;
    }
  });

  return consolidatedAvailability;
}
