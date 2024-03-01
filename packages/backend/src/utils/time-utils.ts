import { DateTime } from 'luxon';

import { sortedAvailabilitySchema, weekdays } from '@backend/types';

// eslint-disable-next-line import/no-cycle
import type { Availability, DateRange, Weekday } from '@backend/types';

export const sortWeekdays = (days: Weekday[]): Weekday[] =>
  days.sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));

/**
 * Checks if a given date is within a specified date range.
 * @param date - The date to check.
 * @param restriction - The date range to compare against.
 * @returns True if the date is within the range, false otherwise.
 */
export const isDateWithinRange = (date: DateTime, restriction: DateRange): boolean => {
  return date >= DateTime.fromISO(restriction.start) && date <= DateTime.fromISO(restriction.end);
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
 * Convert backend dates to time periods
 * @param availability - Availability to convert
 * @returns Time periods
 */
export const convertBackendDatesToTimePeriods = (
  availability: Availability
): Record<string, DateTime> => {
  const tps: Record<string, DateTime> = {};

  // Assuming 'availability' is in the format of Record<Weekday, Array<{ id: string; start: string; end: string }>>
  Object.keys(availability).forEach((weekday) => {
    availability[weekday as Weekday]?.forEach((timeSlot, index) => {
      const startKey = `${weekday}_${index}_start`;
      const endKey = `${weekday}_${index}_end`;

      // Assuming the DateTime here refers to some date-time library that can parse ISO strings
      tps[startKey] = DateTime.fromISO(timeSlot.start);
      tps[endKey] = DateTime.fromISO(timeSlot.end);
    });
  });

  return tps;
};

/**
 * Convert time periods to backend dates
 * @param tps - Time periods
 * @param days - Possible days of the week, if provided, days that are missing from tps will generate time periods spanning the entire day
 * @returns Availability backend dates
 */
export const convertTimePeriodsToBackendDates = (
  tps: Record<string, DateTime>,
  days?: Weekday[]
): Availability => {
  const convertedSchedule: Partial<
    Record<Weekday, Array<{ id: string; start: string; end: string }>>
  > = {};

  Object.keys(tps).forEach((key) => {
    const match = key.match(/(^[a-zA-Z]+)_(\d+)_(start|end)$/);
    if (match != null) {
      const day = match[1].toLowerCase(); // Convert to lowercase to match the enum values
      const index = match[2]; // Identifier for the time period
      const type = match[3] as 'start' | 'end';

      if (Object.values(weekdays).includes(day as Weekday)) {
        const weekday = day as Weekday;

        if (convertedSchedule[weekday] == null) {
          convertedSchedule[weekday] = [];
        }

        let timeSlot = convertedSchedule[weekday]?.find((slot) => slot.id === index);
        if (timeSlot == null) {
          timeSlot = { id: index, start: '', end: '' };
          convertedSchedule[weekday]!.push(timeSlot);
        }

        timeSlot[type] = tps[key].toISO()!;
      }
    }
  });

  if (days != null) {
    days.forEach((day) => {
      if (convertedSchedule[day] == null) {
        convertedSchedule[day] = [
          {
            id: 'none',
            start: DateTime.now().startOf('day').toISO(),
            end: DateTime.now().endOf('day').toISO(),
          },
        ];
      }
    });
  }

  // Validate the overall schedule - this strips the id field
  const parsedSchedule = sortedAvailabilitySchema.parse(convertedSchedule);

  return parsedSchedule;
};

/**
 * Flatten date ranges
 * @param dateRanges - Date ranges to flatten
 * @returns The earliest start date and the latest end date
 */
export const flattenDateRanges = (dateRanges: DateRange[]) => {
  return dateRanges.reduce(
    (acc: { start: string; end: string }, range) => {
      if (acc.start === '' || DateTime.fromISO(range.start) < DateTime.fromISO(acc.start)) {
        acc.start = range.start;
      }
      if (acc.end === '' || DateTime.fromISO(range.end) > DateTime.fromISO(acc.end)) {
        acc.end = range.end;
      }
      return acc;
    },
    { start: '', end: '' }
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
