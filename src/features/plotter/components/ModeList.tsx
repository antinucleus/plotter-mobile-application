import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';

import { RadioOption } from './RadioOption';

type OptionTypes = 'FullStep' | 'HalfStep' | 'QuarterStep' | 'EighthStep' | 'SixteenthStep';

type Option = {
  title: string;
  option: OptionTypes;
};

const options: Option[] = [
  { title: 'Full step mode (0.16 mm)', option: 'FullStep' },
  { title: 'Half step mode (0.08 mm)', option: 'HalfStep' },
  { title: 'Quarter step mode (0.04 mm)', option: 'QuarterStep' },
  { title: 'Eighth step mode (0.02 mm)', option: 'EighthStep' },
  { title: 'Sixteenth step mode (0.01 mm)', option: 'SixteenthStep' },
];

export const ModeList = () => {
  const [option, setOption] = useState<OptionTypes>('FullStep');

  const handleRadioValueChange = (value: string) => setOption(value as OptionTypes);

  useEffect(() => {
    console.log({ option });
  }, [option]);

  return (
    <RadioButton.Group value={option} onValueChange={handleRadioValueChange}>
      {options.map((opt, i) => (
        <RadioOption key={`radio-option-${i}-${opt.option}`} {...opt} />
      ))}
    </RadioButton.Group>
  );
};
