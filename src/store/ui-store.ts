import { create } from "zustand";
import { budgetInterface } from "../types/global";

type ModalType = "add" | "delete" | "edit";

type ModalState = {
  type: ModalType;
  data?: string;
} | null;

type UI = {
  sidenavState: boolean;
  activeNavItem: string;
  openModal: ModalState;
  popoverState: boolean;
  selectedBudget: budgetInterface | null;
};

type Actions = {
  updateSidenavState: (state: UI["sidenavState"]) => void;
  updateActiveNavItem: (state: UI["activeNavItem"]) => void;
  setOpenModal: (state: UI["openModal"]) => void;
  setPopOverState: (state: UI["popoverState"]) => void;
  setSelectedBudget: (state: UI["selectedBudget"]) => void;
};

export type UIActions = UI & Actions;

const useUIStore = create<UIActions>((set) => ({
  sidenavState: true,
  activeNavItem: "",
  openModal: null,
  popoverState: false,
  selectedBudget: null,
  updateSidenavState: () =>
    set((state) => ({ sidenavState: !state.sidenavState })),
  updateActiveNavItem: () =>
    set((state) => ({ activeNavItem: state.activeNavItem })),
  setOpenModal: (modal: ModalState) => set({ openModal: modal }),
  setPopOverState: (state) => set({ popoverState: state }),
  setSelectedBudget: (budget) => set({ selectedBudget: budget }),
}));

export default useUIStore;
