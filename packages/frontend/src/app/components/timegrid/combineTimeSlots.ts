// ToDo: add tests but will push first becase I think we may change the inputs and output formats
//import type { UserAvailability, Weekday } from '@plan2gather/backend/types';
/*
takes: a list of a list of time periods

returns a list of time periods as well as 
*/

// ToDo This is a bad approach if it is too slow i will remake it with a sliding window aproach!
function combineTimeSlots(
  groupTimePeriods: {
    name: string;
    availability: Record<string, { start: string; end: string }[]>;
  }[]
): Record<string, { start: string; end: string; names: string[] }[]> {
  let finalResult: Record<
    string,
    { start: string; end: string; names: string[] }[]
  > = {};
  let usedDays: Set<string> = new Set();

  for (const person of groupTimePeriods) {
    for (const dayOfWeek in person.availability) {
      usedDays.add(dayOfWeek);
    }
  }

  for (const day of usedDays) {
    finalResult[day] = [];
    let dayStartStopSet: Set<string> = new Set();

    for (const person of groupTimePeriods) {
      let dayAvalability: { start: string; end: string }[] =
        person.availability[day] ?? [];

      for (const period of dayAvalability) {
        dayStartStopSet.add(period.start);
        dayStartStopSet.add(period.end);
      }
    }

    let dayStartStop = createStartStopFromSeries(
      Array.from(dayStartStopSet).sort()
    );

    for (const period of dayStartStop) {
      let tempPeriod: { start: string; end: string; names: string[] } = {
        start: period.start,
        end: period.end,
        names: [],
      };
      for (const person of groupTimePeriods) {
        if (isAvalable(person.availability[day], period.start, period.end)) {
          tempPeriod.names.push(person.name);
        }
      }
      finalResult[day].push(tempPeriod);
    }
  }

  return finalResult;
}

//ToDo: make this use binary search in stead of just iterating throught
function isAvalable(
  individualTimePeriods: { start: string; end: string }[],
  start: string,
  end: string
): boolean {
  for (const timePeriod of individualTimePeriods) {
    if (
      Date.parse(start) >= Date.parse(timePeriod.start) &&
      Date.parse(end) <= Date.parse(timePeriod.end)
    ) {
      return true;
    }
    if (Date.parse(timePeriod.start) >= Date.parse(end)) {
      break;
    }
  }
  return false;
}

function createStartStopFromSeries(
  values: string[]
): { start: string; end: string }[] {
  const result: { start: string; end: string }[] = [];

  for (let i = 0; i < values.length - 1; i++) {
    result.push({
      start: values[i],
      end: values[i + 1],
    });
  }

  return result;
}
/* //simple test non extensive
let test: [number,number][][]= [[[0,3],[6,8]],
                            [[1,4],[5,7]],
                            [[1,2],[3,4],[8,10]]];

console.log(combineTimeSlots(test));
*/

const test = [
  {
    name: 'Chris',
    availability: {
      monday: [
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T17:00:00.000-08:00',
        },
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T09:30:00.000-08:00',
        },
      ],
      friday: [
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T09:30:00.000-08:00',
        },
      ],
    },
  },
  {
    name: 'Spencer',
    availability: {
      monday: [
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T17:00:00.000-08:00',
        },
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T09:30:00.000-08:00',
        },
      ],
      friday: [
        {
          start: '2023-12-06T09:00:00.000-08:00',
          end: '2023-12-06T09:30:00.000-08:00',
        },
      ],
    },
  },
];

console.log(combineTimeSlots(test));
