import { create } from 'zustand';

type SelectedImageStore = {
  image: null | string;
  setImage: (image: string) => void;
};

export const useSelectedImageStore = create<SelectedImageStore>((set) => ({
  image: null,
  setImage: (image: string) => set({ image }),
}));
