import { DateTime } from 'luxon';

import { sortWeekdays } from '@backend/utils';

import type { CellData } from '@/app/pages/gathering-view/gathering-view.store';
import type { UserAvailability, DateRange, Weekday } from '@backend/types';

export interface DateRangeLuxon {
  start: DateTime;
  end: DateTime;
}

export interface WeekdayDateRangeLuxon extends DateRangeLuxon {
  weekday: Weekday;
}

export function formattedWeekday(weekday: Weekday) {
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}

function fuzzyGetPeriod(
  weekday: Weekday,
  periods: Array<WeekdayDateRangeLuxon & { names: string[] }>,
  target: DateTime,
  targetPeople: string[],
  requiredPeople: string[]
): CellData {
  const foundPeriod = periods.find(
    (timePeriod) => target >= timePeriod.start && target < timePeriod.end
  );

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
        totalParticipants: targetPeople.length,
        names: foundPeriod.names,
        period: { weekday: foundPeriod.weekday, start: foundPeriod.start, end: foundPeriod.end },
      };
    }
  }

  return {
    totalParticipants: targetPeople.length,
    names: [],
    period: { weekday, start: target, end: target },
  };
}

export function getRowAndColumnLabels(
  combinedAvailability: Record<Weekday, WeekdayDateRangeLuxon[]>,
  timezone: string,
  increment: number = 30 * 60 * 1000,
  padding = 1
) {
  const days = Object.keys(combinedAvailability) as Weekday[];
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
    columnLabels: days,
    rowLabels: Array.from({ length: dataHeight }, (_, rowIndex) =>
      DateTime.fromMillis(rowIndex * increment + dayStart)
        .setZone(timezone)
        .toLocaleString(DateTime.TIME_SIMPLE)
    ),
    dataHeight,
    increment,
    dayStart,
  };
}

export function parseListForTimeSlots(
  combinedAvailability: Record<Weekday, Array<WeekdayDateRangeLuxon & { names: string[] }>>,
  filteredNames: string[],
  allNames: string[],
  timezone: string
): { data: CellData[][]; columnLabels: string[]; rowLabels: string[] } {
  const { columnLabels, rowLabels, dataHeight, increment, dayStart } = getRowAndColumnLabels(
    combinedAvailability,
    timezone
  );

  return {
    data: Array.from({ length: dataHeight }, (_, rowIndex) =>
      Array.from({ length: columnLabels.length }, (_, colIndex) =>
        fuzzyGetPeriod(
          columnLabels[colIndex],
          combinedAvailability[columnLabels[colIndex]],
          DateTime.fromMillis(rowIndex * increment + dayStart).setZone(timezone),
          allNames,
          filteredNames
        )
      )
    ),
    columnLabels,
    rowLabels,
  };
}

export function getBestTimes(data: CellData[]) {
  data.sort((a, b) => b.names.length - a.names.length);

  const uniquePeriods = new Set<string>();
  const bestTimes: CellData[] = [];
  const mostParticipants = data[0]?.names.length ?? 0;

  if (mostParticipants !== 0) {
    data.forEach((cell) => {
      // Only show times that have at least 2 people available
      if (cell.names.length < 2) {
        return;
      }
      const periodStr = `${cell.period.start.toString()}-${cell.period.end.toString()}`;

      // Only show unique periods
      if (!uniquePeriods.has(periodStr)) {
        uniquePeriods.add(periodStr);
        bestTimes.push(cell);
      }
    });
  }

  return { bestTimes, mostParticipants };
}

function createStartStopFromSeries(weekday: Weekday, values: DateTime[]): WeekdayDateRangeLuxon[] {
  return values.slice(0, -1).map((value, i) => ({
    weekday,
    start: value,
    end: values[i + 1],
  }));
}

function isAvailable(
  individualTimePeriods: WeekdayDateRangeLuxon[] | undefined,
  start: DateTime,
  end: DateTime
): boolean {
  return (
    individualTimePeriods?.some((period) => start >= period.start && end <= period.end) ?? false
  );
}

function convertToLuxonDateRange(
  weekday: Weekday,
  dateRange: DateRange,
  timezone: string
): WeekdayDateRangeLuxon {
  return {
    weekday,
    start: DateTime.fromISO(dateRange.start).setZone(timezone),
    end: DateTime.fromISO(dateRange.end).setZone(timezone),
  };
}

export function combineTimeSlots(
  groupTimePeriods: UserAvailability[],
  timezone: string
): Record<string, Array<WeekdayDateRangeLuxon & { names: string[] }>> {
  const finalResult: Record<string, Array<WeekdayDateRangeLuxon & { names: string[] }>> = {};
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
        convertToLuxonDateRange(day, p, timezone)
      );
      dayAvailability?.forEach((period) => {
        dayStartStopSet.add(period.start);
        dayStartStopSet.add(period.end);
      });
    });

    const dayStartStop = createStartStopFromSeries(
      day,
      Array.from(dayStartStopSet).sort((a, b) => a.valueOf() - b.valueOf())
    );

    dayStartStop.forEach((period) => {
      const tempPeriod = {
        weekday: day,
        start: period.start,
        end: period.end,
        names: [] as string[],
      };
      groupTimePeriods.forEach((person) => {
        if (
          isAvailable(
            person.availability[day]?.map((p) => convertToLuxonDateRange(day, p, timezone)),
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
