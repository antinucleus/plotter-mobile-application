import { create } from 'zustand';

import { Direction, DriveMode } from '@/features/types';

type AxisMovementStore = {
  direction: Direction;
  driveMode: DriveMode;
  setDirection: (direction: Direction) => void;
  setDriveMode: (driveMode: DriveMode) => void;
};

export const useAxisMovementStore = create<AxisMovementStore>((set) => ({
  direction: '+',
  driveMode: 'FullStep',
  setDirection: (direction: Direction) => set({ direction }),
  setDriveMode: (driveMode: DriveMode) => set({ driveMode }),
}));
