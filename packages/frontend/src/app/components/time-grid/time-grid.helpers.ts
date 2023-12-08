import {
  DateRange,
  UserAvailability,
  Weekday,
} from '@plan2gather/backend/types';
import { all } from 'axios';
import { DateTime } from 'luxon';

function fuzzyGetPeriod(
  periods: (DateRange & { names: string[] })[],
  target: DateTime,
  targetPeople: string[],
  requiredPeople : string[],
) {
  const foundPeriod = periods.find(
    (timePeriod) =>
      target >= DateTime.fromISO(timePeriod.start) &&
      target < DateTime.fromISO(timePeriod.end)
  );

  let topBorder = '1px dotted grey';
  if ([0, 30].includes(target.minute)) {
    topBorder = '1px solid black';
  }

  if (foundPeriod) {
    const peopleCount = targetPeople.reduce(
      (count, person) => count + (foundPeriod.names.includes(person) ? 1 : 0),
      0
    );

    const requiredPeopleCount = requiredPeople.reduce(
        (count, person) => count + (foundPeriod.names.includes(person) ? 1 : 0),
        0
      );

    if (peopleCount !== 0 && requiredPeopleCount === requiredPeople.length) {

      return {
        color: `rgba(0, ${
          100 + 155 * (peopleCount / targetPeople.length)
        }, 0, 1)`,
        topBorder,
        names: foundPeriod.names,
        period: { start: foundPeriod.start, end: foundPeriod.end },
      };
    }
  }

  return {
    color: '#cccccc',
    topBorder,
    names: [],
    period: { start: target.toISO()!, end: target.toISO()! },
  };
}

function formatTime(date: Date) {
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours %= 12;
  hours = hours || 12; // Handle midnight (12 AM)

  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes} ${ampm}`;
}

export function parseListForTimeSlots(
  combinedAvailability: Record<string, (DateRange & { names: string[] })[]>,
  filteredNames: string[],
  allNames: string[],
  increment: number = 15 * 60 * 1000,
  padding: number = 1
) {
  const days = Object.keys(combinedAvailability);
  let dayStart = Number.MAX_SAFE_INTEGER;
  let dayEnd = Number.MIN_SAFE_INTEGER;

  days.forEach((day) => {
    combinedAvailability[day].forEach((period) => {
      dayStart = Math.min(dayStart, Date.parse(period.start));
      dayEnd = Math.max(dayEnd, Date.parse(period.end));
    });
  });

  dayStart -= increment * padding;
  dayEnd += increment * padding;

  const dataHeight = Math.ceil((dayEnd - dayStart) / increment);

  return {
    data: Array.from({ length: dataHeight }, (_, rowIndex) =>
      Array.from({ length: days.length }, (_1, colIndex) =>
        fuzzyGetPeriod(
          combinedAvailability[days[colIndex]],
          DateTime.fromMillis(rowIndex * increment + dayStart),
          allNames,
          filteredNames,
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
