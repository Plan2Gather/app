import { DateTime } from 'luxon';
import { weekdays } from '../types/const';
// eslint-disable-next-line import/no-cycle
import { sortedAvailabilitySchema } from '../types';
import type { Availability, DateRange, Weekday } from '../types';

export const sortWeekdays = (days: Weekday[]): Weekday[] =>
  days.sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));

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
    if (match) {
      const day = match[1].toLowerCase(); // Convert to lowercase to match the enum values
      const index = match[2]; // Identifier for the time period
      const type = match[3] as 'start' | 'end';

      if (Object.values(weekdays).includes(day as Weekday)) {
        const weekday = day as Weekday;

        if (!convertedSchedule[weekday]) {
          convertedSchedule[weekday] = [];
        }

        let timeSlot = convertedSchedule[weekday]?.find((slot) => slot.id === index);
        if (!timeSlot) {
          timeSlot = { id: index, start: '', end: '' };
          convertedSchedule[weekday]!.push(timeSlot);
        }

        timeSlot[type] = tps[key].toISO()!;
      }
    }
  });

  if (days) {
    days.forEach((day) => {
      if (!convertedSchedule[day]) {
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

export function consolidateAvailability(availability: Availability): Availability {
  const consolidatedAvailability: Availability = {};

  sortWeekdays(Object.keys(availability) as (keyof Availability)[]).forEach((day) => {
    const dayAvailability = availability[day as Weekday];
    if (dayAvailability) {
      const mergedRanges = mergeDateRanges(dayAvailability);
      consolidatedAvailability[day as Weekday] = mergedRanges;
    }
  });

  return consolidatedAvailability;
}
