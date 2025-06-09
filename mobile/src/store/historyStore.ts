import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_NAME } from "../constants";
import { zustandStorage } from "./storage";
import { TPerformance } from "../types";

interface THistoryState {
  history: TPerformance[];
  add: (history: TPerformance) => void;
  remove: (id: string) => void;
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
      remove: (id) => {
        if (_get().last?.id === id) {
          let _last = _get().history.length === 1 ? null : _get().history[1];
          set({
            ..._get(),
            history: _get().history.filter((h) => h.id !== id),
            last: _last,
          });
        } else {
          return set({
            ..._get(),
            history: _get().history.filter((h) => h.id !== id),
          });
        }
      },
    }),
    {
      name: STORAGE_NAME.HISTORY,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
