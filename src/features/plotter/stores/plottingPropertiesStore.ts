import { Optional } from 'utility-types';
import { create } from 'zustand';

type InitialValues = {
  lineNumbering: boolean;
  initialCommand: string[];
  sampleCount: string;
  fill: boolean;
};

type OptionalInitialValues = Optional<InitialValues>;

const initialValues: InitialValues = {
  lineNumbering: false,
  initialCommand: [],
  sampleCount: '30',
  fill: false,
};

type PlottingPropertiesStore = {
  values: InitialValues;
  setValues: (values: OptionalInitialValues) => void;
};

export const usePlottingPropertiesStore = create<PlottingPropertiesStore>((set, get) => ({
  values: initialValues,
  setValues: (newValues: OptionalInitialValues) =>
    set({ values: { ...get().values, ...(newValues as InitialValues) } }),
}));
