import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_NAME } from "../constants";
import { zustandStorage } from "./storage";
import { TPerformance } from "../types";

interface THistoryState {
  history: TPerformance[];
  add: (history: TPerformance) => void;
  clear: () => void;
  last: TPerformance | null;
}

export const useHistoryStore = create<THistoryState>()(
  persist(
    (set, _get) => ({
      last: null,
      history: [],
      add: (hist) =>
        set({ ..._get(), history: [hist, ..._get().history], last: hist }),
      clear: () => set({ ..._get(), history: [] }),
    }),
    {
      name: STORAGE_NAME.HISTORY,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
