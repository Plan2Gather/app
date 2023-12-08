import {
  DateRange,
  UserAvailability,
  Weekday,
} from '@plan2gather/backend/types';

function fuzzyGetPeriod(
  periods: { start: string; end: string; names: string[] }[],
  target: number,
  targetPeople: string[]
) {
  const foundPeriod = periods.find(
    (timePeriod) =>
      target >= Date.parse(timePeriod.start) &&
      target <= Date.parse(timePeriod.end)
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
    period: { start: target, end: target },
  };
}

function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function parseListForTimeSlots(
  combinedAvailability: Record<
    string,
    { start: string; end: string; names: string[] }[]
  >,
  increment: number = 15 * 60 * 1000,
  padding: number = 2,
  filteredNames: string[] = ['Spencer', 'Chris']
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
          rowIndex * increment + dayStart,
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
        Date.parse(start) >= Date.parse(period.start) &&
        Date.parse(end) <= Date.parse(period.end)
    ) ?? false
  );
}

export function combineTimeSlots(
  groupTimePeriods: UserAvailability[]
): Record<string, { start: string; end: string; names: string[] }[]> {
  const finalResult: Record<
    string,
    { start: string; end: string; names: string[] }[]
  > = {};
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
