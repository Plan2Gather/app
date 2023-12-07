import type { Meta } from '@storybook/react';
import TimeGrid from './timegrid';

const meta: Meta<typeof TimeGrid> = {
    component: TimeGrid,
    title: 'TimeGrid', // Title for your story
    parameters: {
        controls: { hideNoControlsWarning: true }, // Optional: Hide controls warning
    },
};

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
                    end: '2023-12-06T15:00:00.000-08:00',
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

export default meta;

export const Primary = (args: {
    data: {color :string, names : string[],period : {start :string,end : string}}[][];
    columnLabels: string[];
    rowLabels: string[];
}) => <TimeGrid {...args} />;

Primary.args = parseListForTImeSlots(combineTimeSlots(test));



function parseListForTImeSlots(combindAvalability : Record<string, {  start: string; end: string; names: string[] }[]>, incriment : number = 15 *60*1000,padding:number = 2, filterdNames : string[] = ['Spencer','Chris']){
    let days = Object.keys(combindAvalability);
    let dayStart : number = Number.MAX_SAFE_INTEGER;
    let dayEnd : number = Number.MIN_SAFE_INTEGER;
    for (const day of days){
        for (const period of combindAvalability[day]){
            dayStart = Math.min(dayStart,Date.parse(period.start));
            dayEnd = Math.max(dayEnd,Date.parse(period.end));
        }    
    }

    dayStart =  dayStart - (incriment *padding)
    dayEnd = dayEnd + (incriment *padding)
    let dataHeight =  Math.ceil((dayEnd - dayStart) / incriment)


    return {data : Array.from({ length: dataHeight }, (_, rowIndex) =>
        Array.from({ length: days.length }, (_, colIndex) =>
            fuzzyGetPeriod(combindAvalability[days[colIndex]],(rowIndex * incriment) + dayStart,filterdNames)
        )
    ),columnLabels:days, rowLabels: Array.from({ length: dataHeight }, (_, rowIndex) => formatTime(new Date((rowIndex * incriment) + dayStart)))}
}

function formatTime(date:Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }

function fuzzyGetPeriod(periods : {  start: string; end: string; names: string[] }[], target : number, targetPeople: string[]){
    for (const timePeriod of periods) {
        
        if (target >= Date.parse(timePeriod.start) && target <= Date.parse(timePeriod.end)) {
            let peopleCount = 0;
            for (const target of targetPeople){
                if (timePeriod.names.includes(target)){
                    peopleCount = peopleCount + 1;
                }
            }
            if (peopleCount != 0){
                return {color : `rgba(0, ${100 + (155 * (peopleCount / targetPeople.length))}, 0, 1)`, names : timePeriod.names,period :{start : timePeriod.start, end : timePeriod.end}};
            }
            
        }
    }
    return {color : '#cccccc', names : [], period :{start : target, end : target}}
   
}

function combineTimeSlots(
    groupTimePeriods: {
        name: string;
        availability: Record<string, { start: string; end: string }[]>;
    }[]
): Record<string, {  start: string; end: string; names: string[] }[]> {
    let finalResult: Record<
        string,
        {  start: string; end: string; names: string[] }[]
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
            let dayAvalability: {  start: string; end: string }[] =
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
                if (
                    isAvalable(
                        person.availability[day],
                        period.start,
                        period.end
                    )
                ) {
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
    individualTimePeriods: {  start: string; end: string}[],
    start: string,
    end: string
): boolean {
    for (const timePeriod of individualTimePeriods) {
        if (Date.parse(start) >= Date.parse(timePeriod.start) && Date.parse(end) <= Date.parse(timePeriod.end)) {
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
): {  start: string; end: string }[] {
    const result: {  start: string; end: string }[] = [];

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



