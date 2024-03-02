import { create } from 'zustand';

import type { DateRangeLuxon, GatheringFormDetails, Weekday } from '@backend/types';

export interface PossibleDatesData {
  weekdays: Weekday[];
  period: DateRangeLuxon;
}

export interface CreationStore {
  details: GatheringFormDetails | null;
  possibleDates: PossibleDatesData;
  setDetails: (details: GatheringFormDetails) => void;
  setPossibleDates: (possibleDates: PossibleDatesData) => void;
}

const useCreationStore = create<CreationStore>((set) => ({
  details: null,
  possibleDates: {} as unknown as PossibleDatesData,
  timePeriods: {},
  timePeriodsFormData: null,
  setDetails: (details) => {
    set({ details });
  },
  setPossibleDates: (possibleDates) => {
    set({ possibleDates });
  },
}));

export default useCreationStore;
