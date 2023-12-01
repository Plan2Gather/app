import { create } from 'zustand';
import { GatheringFormDetails } from '@plan2gather/backend/types';
import { Weekday } from 'packages/frontend/src/utils/utils';

export interface GatheringStepperFormData {
  details: GatheringFormDetails | null;
  possibleDates: Weekday[] | null;
  setDetails: (details: GatheringFormDetails) => void;
  setPossibleDates: (possibleDates: Weekday[]) => void;
}

const useGatheringStepperFormData = create<GatheringStepperFormData>((set) => ({
  details: null,
  possibleDates: null,
  setDetails: (details) => set({ details }),
  setPossibleDates: (possibleDates) => set({ possibleDates }),
}));

export default useGatheringStepperFormData;
