import { create } from 'zustand';

import { GcodeConfigInitialValues, OptionalGcodeConfigInitialValues } from '@/features/types';

const initialValues: GcodeConfigInitialValues = {
  lineNumbering: false,
  initialCommand: [],
  sampleCount: '30',
  fill: false,
};

type PlottingPropertiesStore = {
  values: GcodeConfigInitialValues;
  setValues: (values: OptionalGcodeConfigInitialValues) => void;
};

export const usePlottingPropertiesStore = create<PlottingPropertiesStore>((set, get) => ({
  values: initialValues,
  setValues: (newValues: OptionalGcodeConfigInitialValues) =>
    set({ values: { ...get().values, ...(newValues as GcodeConfigInitialValues) } }),
}));
