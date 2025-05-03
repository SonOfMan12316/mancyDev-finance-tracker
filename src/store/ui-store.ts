import { create } from "zustand";

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
};

type Actions = {
  updateSidenavState: (state: UI["sidenavState"]) => void;
  updateActiveNavItem: (state: UI["activeNavItem"]) => void;
  setOpenModal: (state: UI["openModal"]) => void;
  setPopOverState: (state: UI["popoverState"]) => void;
};

export type UIActions = UI & Actions;

const useUIStore = create<UIActions>((set) => ({
  sidenavState: true,
  activeNavItem: "",
  openModal: null,
  popoverState: false,
  updateSidenavState: () =>
    set((state) => ({ sidenavState: !state.sidenavState })),
  updateActiveNavItem: () =>
    set((state) => ({ activeNavItem: state.activeNavItem })),
  setOpenModal: (modal: ModalState) => set({ openModal: modal }),
  setPopOverState: (state) => set({ popoverState: state }),
}));

export default useUIStore;
