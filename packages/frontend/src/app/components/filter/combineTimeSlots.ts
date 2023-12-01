//ToDo: add tests but will push first becase I think we may change the inputs and output formats

/*
takes: a list of a list of time periods

returns a list of time periods as well as 
*/

export function combineTimeSlots(groupTimePeriods : [number,number][][]): [number,number,number][]{

    let finalResult: [number,number,number][]= [];
    let slotSet: number[] = [];

    for (const individualTimePeriods of groupTimePeriods) {
        for (const timePeriod of individualTimePeriods){
            addToSortedSet(slotSet,timePeriod[0]); //add start and end to uniqu
            addToSortedSet(slotSet,timePeriod[1]);
        } 
    }

    

    for (let i = 0; i < (slotSet.length-1); i++) {
        let isAvalableCount:number = 0;
        for (const individualTimePeriods of groupTimePeriods) {
            if (isAvalable(individualTimePeriods,slotSet[i],slotSet[i+1])){
                isAvalableCount++;
                //console.log('returned true \n individualTimePeriods: %o start: %d, end %d', individualTimePeriods,slotSet[i],slotSet[i+1]);
            }else{
                //console.log('returned false \n individualTimePeriods: %o start: %d, end %d', individualTimePeriods,slotSet[i],slotSet[i+1]);
            }
            
        }
        finalResult.push([slotSet[i],slotSet[i+1],isAvalableCount])
    }
    
    return finalResult;
}

//helper Function to add to the sorted set.
function addToSortedSet(mySet: number[] , value: number): void{
    const indexToInsert = mySet.findIndex(element => element >= value);

    if (mySet[indexToInsert] != value){
        mySet.splice(indexToInsert !== -1 ? indexToInsert : mySet.length, 0, value);//ToDo: understand this. just stackOverflowed it and am a bit confused 
    }
    
}


//ToDo: make this use binary search in stead of just iterating throught
function isAvalable(individualTimePeriods:[number,number][],start:number,end:number):boolean{
    for(const timePeriod of individualTimePeriods){
        if (start >= timePeriod[0] && end <= timePeriod[1]){
            return true;
        }
        if (timePeriod[0] >= end){
            break;
        }
    }
    return false;
}
/* //simple test non extensive
let test: [number,number][][]= [[[0,3],[6,8]],
                            [[1,4],[5,7]],
                            [[1,2],[3,4],[8,10]]];

console.log(combineTimeSlots(test));

*/