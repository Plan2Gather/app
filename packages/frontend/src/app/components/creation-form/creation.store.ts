import { create } from 'zustand';
import {
  Availability,
  GatheringFormDetails,
  Weekday,
} from '@plan2gather/backend/types';

export interface CreationStore {
  details: GatheringFormDetails | null;
  possibleDates: Weekday[];
  timePeriods: Availability;
  setDetails: (details: GatheringFormDetails) => void;
  setPossibleDates: (possibleDates: Weekday[]) => void;
  setTimePeriods: (timePeriods: Availability) => void;
}

const useCreationStore = create<CreationStore>((set) => ({
  details: null,
  possibleDates: [],
  timePeriods: {},
  timePeriodsFormData: null,
  setDetails: (details) => set({ details }),
  setPossibleDates: (possibleDates) => set({ possibleDates }),
  setTimePeriods: (timePeriods) => set({ timePeriods }),
}));

export default useCreationStore;
