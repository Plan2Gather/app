import { create } from 'zustand';
import { GatheringFormDetails } from '@plan2gather/backend/types';
import { Weekday } from '@plan2gather/backend/types';
import { DateTime } from 'luxon';
import { DateRangeLuxon } from '../time-range-selections/time-range-picker/time-range-picker';

export interface GatheringStepperFormData {
  details: GatheringFormDetails | null;
  possibleDates: Weekday[];
  timePeriods: Partial<Record<Weekday, DateRangeLuxon[]>>;
  timePeriodsFormData: Partial<
    Record<Weekday, Record<string, DateTime>>
  > | null;
  setDetails: (details: GatheringFormDetails) => void;
  setPossibleDates: (possibleDates: Weekday[]) => void;
  setTimePeriods: (
    timePeriods: Partial<Record<Weekday, DateRangeLuxon[]>>
  ) => void;
  setTimePeriodsForDay: (day: Weekday, timePeriods: DateRangeLuxon[]) => void;
  addTimePeriodForDay: (day: Weekday, timePeriod: DateRangeLuxon) => void;
  removeTimePeriodForDay: (day: Weekday, id: string) => void;
  updateTimePeriodForDay: (day: Weekday, timePeriods: DateRangeLuxon) => void;
  setTimePeriodsFormData: (
    day: Weekday,
    data: Record<string, DateTime>
  ) => void;
}

const useGatheringStepperFormData = create<GatheringStepperFormData>((set) => ({
  details: null,
  possibleDates: [],
  timePeriods: {} as Record<Weekday, DateRangeLuxon[]>,
  timePeriodsFormData: null,
  setDetails: (details) => set({ details }),
  setPossibleDates: (possibleDates) => set({ possibleDates }),
  setTimePeriods: (timePeriods) => set({ timePeriods }),
  setTimePeriodsForDay: (day, timePeriods) =>
    set((state) => ({
      timePeriods: {
        ...state.timePeriods,
        [day]: timePeriods,
      },
    })),
  addTimePeriodForDay: (day, timePeriod) =>
    set((state) => {
      const existing = state.timePeriods[day];

      let periods: DateRangeLuxon[] = [];
      if (existing) {
        periods = [...existing];
      }

      return {
        timePeriods: {
          ...state.timePeriods,
          [day]: [...periods, timePeriod],
        },
      };
    }),
  removeTimePeriodForDay: (day, id) =>
    set((state) => ({
      timePeriods: {
        ...state.timePeriods,
        [day]: state.timePeriods[day]?.filter((tp) => tp.id !== id),
      },
    })),
  updateTimePeriodForDay: (day, timePeriod) =>
    set((state) => ({
      timePeriods: {
        ...state.timePeriods,
        [day]: state.timePeriods[day]?.map((tp) =>
          tp.id === timePeriod.id ? timePeriod : tp
        ),
      },
    })),
  setTimePeriodsFormData: (day, data) =>
    set((state) => ({
      ...state,
      timePeriodsFormData: {
        ...state.timePeriodsFormData,
        [day]: data, // Ensuring data is always of type Record<string, DateTime>
      },
    })),
}));

export default useGatheringStepperFormData;
