import { create } from 'zustand';
import { GatheringFormDetails, Weekday } from '@plan2gather/backend/types';
import { DateTime } from 'luxon';

export interface GatheringStepperFormData {
  details: GatheringFormDetails | null;
  possibleDates: Weekday[];
  timePeriods: Record<string, DateTime>;
  setDetails: (details: GatheringFormDetails) => void;
  setPossibleDates: (possibleDates: Weekday[]) => void;
  setTimePeriods: (timePeriods: Record<string, DateTime>) => void;
}

const useGatheringStepperFormData = create<GatheringStepperFormData>((set) => ({
  details: null,
  possibleDates: [],
  timePeriods: {},
  timePeriodsFormData: null,
  setDetails: (details) => set({ details }),
  setPossibleDates: (possibleDates) => set({ possibleDates }),
  setTimePeriods: (timePeriods) => set({ timePeriods }),
}));

export default useGatheringStepperFormData;
