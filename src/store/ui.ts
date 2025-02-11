import { create } from "zustand";

type UI = {
  bottomnavState: boolean;
  sidenavState: boolean;
};

type Actions = {
  updateBottomnavState: (state: UI["bottomnavState"]) => void;
  updateSidenavState: (state: UI["sidenavState"]) => void;
};

type UIActions = UI & Actions;

const useUIStore = create<UIActions>()((set) => ({
  sidenavState: false,
  bottomnavState: false,
  updateSidenavState: (state) => set(() => ({ sidenavState: state })),
  updateBottomnavState: (state) => set(() => ({ bottomnavState: state })),
}));

export { useUIStore };
