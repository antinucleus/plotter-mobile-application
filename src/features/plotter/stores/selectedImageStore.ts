import { create } from 'zustand';

type Image = {
  uri: null | string;
  imageName: string;
  imageType: string;
};

type SelectedImageStore = {
  image: Image;
  setImage: (image: Image) => void;
};

export const useSelectedImageStore = create<SelectedImageStore>((set) => ({
  image: {
    uri: null,
    imageName: '',
    imageType: '',
  },
  setImage: (image: Image) => set({ image }),
}));
