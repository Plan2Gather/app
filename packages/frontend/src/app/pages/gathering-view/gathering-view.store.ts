import { create } from 'zustand';

export interface GatheringViewData {
  checkedUsers: string[];
  setCheckedUsers: (checkedUsers: string[]) => void;
}

const useGatheringViewData = create<GatheringViewData>((set) => ({
  checkedUsers: [],
  setCheckedUsers: (checkedUsers) => set({ checkedUsers }),
}));

export default useGatheringViewData;
