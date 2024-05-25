import { Optional } from 'utility-types';

export type GcodeConfigInitialValues = {
  lineNumbering: boolean;
  initialCommand: string[];
  sampleCount: string;
  fill: boolean;
};

export type OptionalGcodeConfigInitialValues = Optional<GcodeConfigInitialValues>;
