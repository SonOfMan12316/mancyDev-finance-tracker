import { create } from "zustand";

type UI = {
  sidenavState: boolean;
  activeNavItem: string;
};

type Actions = {
  updateSidenavState: (state: UI["sidenavState"]) => void;
  updateActiveNavItem: (state: UI["activeNavItem"]) => void;
};

export type UIActions = UI & Actions;

const useUIStore = create<UIActions>((set) => ({
  sidenavState: true,
  activeNavItem: "",
  updateSidenavState: () =>
    set((state) => ({ sidenavState: !state.sidenavState })),
  updateActiveNavItem: () =>
    set((state) => ({ activeNavItem: state.activeNavItem })),
}));

export default useUIStore;
