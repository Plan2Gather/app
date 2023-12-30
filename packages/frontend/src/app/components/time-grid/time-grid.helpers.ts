import { DateTime } from 'luxon';

import { type DateRange, type UserAvailability, type Weekday } from '@backend/types';
import { sortWeekdays } from '@backend/utils';

interface DateRangeLuxon {
  start: DateTime;
  end: DateTime;
}

function fuzzyGetPeriod(
  periods: Array<DateRangeLuxon & { names: string[] }>,
  target: DateTime,
  targetPeople: string[],
  requiredPeople: string[]
) {
  const foundPeriod = periods.find(
    (timePeriod) => target >= timePeriod.start && target < timePeriod.end
  );

  let topBorder = '1px dotted grey';
  if ([0, 30].includes(target.minute)) {
    topBorder = '1px solid black';
  }

  if (foundPeriod != null) {
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
        color: `rgba(0, ${100 + 155 * (peopleCount / targetPeople.length)}, 0, 1)`,
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
    period: { start: target, end: target },
  };
}

export function parseListForTimeSlots(
  combinedAvailability: Record<string, Array<DateRangeLuxon & { names: string[] }>>,
  filteredNames: string[],
  allNames: string[],
  timezone: string,
  increment: number = 15 * 60 * 1000,
  padding: number = 1
) {
  const days = Object.keys(combinedAvailability);
  let dayStart = Number.MAX_SAFE_INTEGER;
  let dayEnd = Number.MIN_SAFE_INTEGER;

  days.forEach((day) => {
    combinedAvailability[day].forEach((period) => {
      dayStart = Math.min(dayStart, period.start.toMillis());
      dayEnd = Math.max(dayEnd, period.end.toMillis());
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
          DateTime.fromMillis(rowIndex * increment + dayStart).setZone(timezone),
          allNames,
          filteredNames
        )
      )
    ),
    columnLabels: days,
    rowLabels: Array.from({ length: dataHeight }, (_, rowIndex) =>
      DateTime.fromMillis(rowIndex * increment + dayStart)
        .setZone(timezone)
        .toLocaleString(DateTime.TIME_SIMPLE)
    ),
  };
}

function createStartStopFromSeries(values: DateTime[]): DateRangeLuxon[] {
  return values.slice(0, -1).map((value, i) => ({
    start: value,
    end: values[i + 1],
  }));
}

function isAvailable(
  individualTimePeriods: DateRangeLuxon[] | undefined,
  start: DateTime,
  end: DateTime
): boolean {
  return (
    individualTimePeriods?.some((period) => start >= period.start && end <= period.end) ?? false
  );
}

function convertToLuxonDateRange(dateRange: DateRange, timezone: string): DateRangeLuxon {
  return {
    start: DateTime.fromISO(dateRange.start).setZone(timezone),
    end: DateTime.fromISO(dateRange.end).setZone(timezone),
  };
}

export function combineTimeSlots(
  groupTimePeriods: UserAvailability[],
  timezone: string
): Record<string, Array<DateRangeLuxon & { names: string[] }>> {
  const finalResult: Record<string, Array<DateRangeLuxon & { names: string[] }>> = {};
  const usedDays = new Set<Weekday>();

  groupTimePeriods.forEach((person) => {
    Object.keys(person.availability).forEach((dayOfWeek) => {
      usedDays.add(dayOfWeek as Weekday);
    });
  });

  // sort used days using sortWeekdays function
  const sortedUsedDays = sortWeekdays(Array.from(usedDays));

  sortedUsedDays.forEach((day) => {
    finalResult[day] = [];
    const dayStartStopSet = new Set<DateTime>();

    groupTimePeriods.forEach((person) => {
      const dayAvailability = person.availability[day]?.map((p) =>
        convertToLuxonDateRange(p, timezone)
      );
      dayAvailability?.forEach((period) => {
        dayStartStopSet.add(period.start);
        dayStartStopSet.add(period.end);
      });
    });

    const dayStartStop = createStartStopFromSeries(
      Array.from(dayStartStopSet).sort((a, b) => a.valueOf() - b.valueOf())
    );

    dayStartStop.forEach((period) => {
      const tempPeriod = {
        start: period.start,
        end: period.end,
        names: [] as string[],
      };
      groupTimePeriods.forEach((person) => {
        if (
          isAvailable(
            person.availability[day]?.map((p) => convertToLuxonDateRange(p, timezone)),
            period.start,
            period.end
          )
        ) {
          tempPeriod.names.push(person.name);
        }
      });
      finalResult[day].push(tempPeriod);
    });
  });

  return finalResult;
}
