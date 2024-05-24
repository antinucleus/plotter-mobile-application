import { create } from 'zustand';

import { AxisPosition } from '@/features/types';

type AxisPositionStore = {
  axisPosition: AxisPosition;
  setAxisPosition: (axisPosition: AxisPosition) => void;
};

export const useAxisPositionStore = create<AxisPositionStore>((set) => ({
  axisPosition: { x: 0, y: 0 },
  setAxisPosition: (axisPosition: AxisPosition) => set({ axisPosition }),
}));
