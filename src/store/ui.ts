import { create } from "zustand";

type UI = {
  sidenavState: boolean;
};

type Actions = {
  updateSidenavState: (state: UI["sidenavState"]) => void;
};

type UIActions = UI & Actions;

const useUIStore = create<UIActions>()((set) => ({
  sidenavState: false,
  updateSidenavState: (state) => set(() => ({ sidenavState: state })),
}));

export { useUIStore };
