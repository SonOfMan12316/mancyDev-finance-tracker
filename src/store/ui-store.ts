import { create } from "zustand";
import {
  budgetInfo,
  potInterface,
  transactionInterface,
} from "../types/global";

type ModalType = "add" | "delete" | "edit" | "addMoney" | "withdraw";

type ModalState = {
  type: ModalType;
  data?: {
    id?: string;
    title?: string;
  };
} | null;

type UI = {
  sidenavState: boolean;
  activeNavItem: string;
  openModal: ModalState;
  popoverState: boolean;
  sharedTitle: string;
  selectedBudget: budgetInfo | null;
  selectedPot: potInterface | null;
  transactions: transactionInterface[] | [];
};

type Actions = {
  updateSidenavState: (state: UI["sidenavState"]) => void;
  updateActiveNavItem: (state: UI["activeNavItem"]) => void;
  setOpenModal: (state: UI["openModal"]) => void;
  setPopOverState: (state: UI["popoverState"]) => void;
  setSelectedBudget: (state: UI["selectedBudget"]) => void;
  setSelectedPot: (state: UI["selectedPot"]) => void;
  setTransactions: (state: UI["transactions"]) => void;
  setSharedTitle: (state: UI["sharedTitle"]) => void;
};

export type UIActions = UI & Actions;

const useUIStore = create<UIActions>((set) => ({
  sidenavState: true,
  activeNavItem: "",
  openModal: null,
  popoverState: false,
  selectedBudget: null,
  selectedPot: null,
  sharedTitle: "",
  transactions: [],
  updateSidenavState: () =>
    set((state) => ({ sidenavState: !state.sidenavState })),
  updateActiveNavItem: () =>
    set((state) => ({ activeNavItem: state.activeNavItem })),
  setOpenModal: (modal: ModalState) => set({ openModal: modal }),
  setPopOverState: (state) => set({ popoverState: state }),
  setSelectedBudget: (budget) => set({ selectedBudget: budget }),
  setSelectedPot: (pot) => set({ selectedPot: pot }),
  setTransactions: (transaction) => set({ transactions: transaction }),
  setSharedTitle: (state) => set({ sharedTitle: state }),
}));

export default useUIStore;
