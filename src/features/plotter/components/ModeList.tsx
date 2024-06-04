import React, { useEffect } from 'react';
import { RadioButton } from 'react-native-paper';

import { RadioOption } from './RadioOption';
import { useAxisMovementStore } from '../stores';

import { DriveMode } from '@/features/types';

type Option = {
  title: string;
  option: DriveMode;
};

const options: Option[] = [
  { title: 'Full step mode (0.16 mm)', option: 'FullStep' },
  { title: 'Half step mode (0.08 mm)', option: 'HalfStep' },
  { title: 'Quarter step mode (0.04 mm)', option: 'QuarterStep' },
  { title: 'Eighth step mode (0.02 mm)', option: 'EighthStep' },
  { title: 'Sixteenth step mode (0.01 mm)', option: 'SixteenthStep' },
];

export const ModeList = () => {
  const { driveMode, setDriveMode } = useAxisMovementStore();

  const handleRadioValueChange = (value: string) => setDriveMode(value as DriveMode);

  useEffect(() => {
    console.log({ driveMode });
  }, [driveMode]);

  return (
    <RadioButton.Group value={driveMode} onValueChange={handleRadioValueChange}>
      {options.map((opt, i) => (
        <RadioOption key={`radio-option-${i}-${opt.option}`} {...opt} />
      ))}
    </RadioButton.Group>
  );
};
