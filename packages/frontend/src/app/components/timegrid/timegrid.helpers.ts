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
      (count, tp) => count + (foundPeriod.names.includes(tp) ? 1 : 0),
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
  let dayStart: number = Number.MAX_SAFE_INTEGER;
  let dayEnd: number = Number.MIN_SAFE_INTEGER;
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

function createStartStopFromSeries(
  values: string[]
): { start: string; end: string }[] {
  const result: { start: string; end: string }[] = [];

  for (let i = 0; i < values.length - 1; i += 1) {
    result.push({
      start: values[i],
      end: values[i + 1],
    });
  }

  return result;
}

function isAvailable(
  individualTimePeriods: { start: string; end: string }[],
  start: string,
  end: string
): boolean {
  return individualTimePeriods.some(
    (timePeriod) =>
      Date.parse(start) >= Date.parse(timePeriod.start) &&
      Date.parse(end) <= Date.parse(timePeriod.end)
  );
}

export function combineTimeSlots(
  groupTimePeriods: {
    name: string;
    availability: Record<string, { start: string; end: string }[]>;
  }[]
): Record<string, { start: string; end: string; names: string[] }[]> {
  const finalResult: Record<
    string,
    { start: string; end: string; names: string[] }[]
  > = {};
  const usedDays: Set<string> = new Set();

  groupTimePeriods.forEach((person) => {
    Object.keys(person.availability).forEach((dayOfWeek) => {
      usedDays.add(dayOfWeek);
    });
  });

  usedDays.forEach((day) => {
    finalResult[day] = [];
    const dayStartStopSet: Set<string> = new Set();

    groupTimePeriods.forEach((person) => {
      const dayAvailability: { start: string; end: string }[] =
        person.availability[day] ?? [];

      dayAvailability.forEach((period) => {
        dayStartStopSet.add(period.start);
        dayStartStopSet.add(period.end);
      });
    });

    const dayStartStop = createStartStopFromSeries(
      Array.from(dayStartStopSet).sort()
    );

    dayStartStop.forEach((period) => {
      const tempPeriod: { start: string; end: string; names: string[] } = {
        start: period.start,
        end: period.end,
        names: [],
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
