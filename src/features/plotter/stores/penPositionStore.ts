import { create } from 'zustand';

import { PenPosition } from '@/features/types';

type PenPositionStore = {
  penPosition: PenPosition;
  setPenPosition: (penPosition: PenPosition) => void;
};

export const usePenPositionStore = create<PenPositionStore>((set) => ({
  penPosition: 'none',
  setPenPosition: (penPosition: PenPosition) => set({ penPosition }),
}));
