import { create } from 'zustand';

type ControlStore = {
  isExited: boolean;
  isDisabled: boolean;
  setIsExited: (isExited: boolean) => void;
  setIsDisabled: (isDisabled: boolean) => void;
};

export const useControlStore = create<ControlStore>((set) => ({
  isExited: false,
  isDisabled: false,
  setIsExited: (isExited: boolean) => set({ isExited }),
  setIsDisabled: (isDisabled: boolean) => set({ isDisabled }),
}));
