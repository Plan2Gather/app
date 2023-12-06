import {
  Availability,
  Weekday,
  availabilitySchema,
} from '@plan2gather/backend/types';
import { DateTime } from 'luxon';
import Utils from '../../../../utils/utils';

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

export const convertTimePeriodsToBackendDates = (
  tps: Record<string, DateTime>
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

      if (Object.values(Utils.weekdays).includes(day as Weekday)) {
        const weekday = day as Weekday;

        if (!convertedSchedule[weekday]) {
          convertedSchedule[weekday] = [];
        }

        let timeSlot = convertedSchedule[weekday]?.find(
          (slot) => slot.id === index
        );
        if (!timeSlot) {
          timeSlot = { id: index, start: '', end: '' };
          convertedSchedule[weekday]!.push(timeSlot);
        }

        timeSlot[type] = tps[key].toISO()!;
      }
    }
  });

  // Validate the overall schedule - this strips the id field
  const parsedSchedule = availabilitySchema.parse(convertedSchedule);

  return parsedSchedule;
};
