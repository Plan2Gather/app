import {
  DateRange,
  UserAvailability,
  Weekday,
} from '@plan2gather/backend/types';
import { DateTime } from 'luxon';

function fuzzyGetPeriod(
  periods: (DateRange & { names: string[] })[],
  target: DateTime,
  targetPeople: string[]
) {
  const foundPeriod = periods.find(
    (timePeriod) =>
      target >= DateTime.fromISO(timePeriod.start) &&
      target <= DateTime.fromISO(timePeriod.end)
  );

  if (foundPeriod) {
    const peopleCount = targetPeople.reduce(
      (count, person) => count + (foundPeriod.names.includes(person) ? 1 : 0),
      0
    );

    if (peopleCount !== 0) {
      return {
        color: `rgba(0, ${
          100 + 155 * (peopleCount / targetPeople.length)
        }, 0, 1)`,
        names: foundPeriod.names,
        period: { start: foundPeriod.start, end: foundPeriod.end },
      };
    }
  }

  return {
    color: '#cccccc',
    names: [],
    period: { start: target.toISO()!, end: target.toISO()! },
  };
}

function formatTime(date: Date, display: string[] = ['00', '30']) {
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours %= 12;
  hours = hours || 12; // Handle midnight (12 AM)

  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (display.includes(minutes)) {
    return `${hours}:${minutes} ${ampm}`;
  }
  return '';
}

export function parseListForTimeSlots(
  combinedAvailability: Record<string, (DateRange & { names: string[] })[]>,
  increment: number = 15 * 60 * 1000,
  padding: number = 2,
  filteredNames: string[] = ['Spencer', 'Chris']
) {
  const days = Object.keys(combinedAvailability);
  const allPeriods = days.flatMap((day) => combinedAvailability[day]);
  const dayStart = Math.min(
    ...allPeriods.map((period) => DateTime.fromISO(period.start).toMillis())
  );
  const dayEnd = Math.max(
    ...allPeriods.map((period) => DateTime.fromISO(period.end).toMillis())
  );

  const dataHeight = Math.ceil((dayEnd - dayStart) / increment);

  return {
    data: Array.from({ length: dataHeight }, (_, rowIndex) =>
      Array.from({ length: days.length }, (_1, colIndex) =>
        fuzzyGetPeriod(
          combinedAvailability[days[colIndex]],
          DateTime.fromMillis(rowIndex * increment + dayStart),
          filteredNames
        )
      )
    ),
    columnLabels: days,
    rowLabels: Array.from({ length: dataHeight }, (_, rowIndex) =>
      formatTime(new Date(rowIndex * increment + dayStart))
    ),
  };
}

function createStartStopFromSeries(values: string[]): DateRange[] {
  return values.slice(0, -1).map((value, i) => ({
    start: value,
    end: values[i + 1],
  }));
}

function isAvailable(
  individualTimePeriods: DateRange[] | undefined,
  start: string,
  end: string
): boolean {
  return (
    individualTimePeriods?.some(
      (period) =>
        DateTime.fromISO(start) >= DateTime.fromISO(period.start) &&
        DateTime.fromISO(end) <= DateTime.fromISO(period.end)
    ) ?? false
  );
}

export function combineTimeSlots(
  groupTimePeriods: UserAvailability[]
): Record<string, (DateRange & { names: string[] })[]> {
  const finalResult: Record<string, (DateRange & { names: string[] })[]> = {};
  const usedDays = new Set<Weekday>();

  groupTimePeriods.forEach((person) => {
    Object.keys(person.availability).forEach((dayOfWeek) => {
      usedDays.add(dayOfWeek as Weekday);
    });
  });

  usedDays.forEach((day) => {
    finalResult[day] = [];
    const dayStartStopSet = new Set<string>();

    groupTimePeriods.forEach((person) => {
      const dayAvailability = person.availability[day];
      dayAvailability?.forEach((period) => {
        dayStartStopSet.add(period.start);
        dayStartStopSet.add(period.end);
      });
    });

    const dayStartStop = createStartStopFromSeries(
      Array.from(dayStartStopSet).sort()
    );

    dayStartStop.forEach((period) => {
      const tempPeriod = {
        start: period.start,
        end: period.end,
        names: [] as string[],
      };
      groupTimePeriods.forEach((person) => {
        if (isAvailable(person.availability[day], period.start, period.end)) {
          tempPeriod.names.push(person.name);
        }
      });
      finalResult[day].push(tempPeriod);
    });
  });

  return finalResult;
}