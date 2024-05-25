import React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { RadioOption } from './RadioOption';
import { usePlottingPropertiesStore } from '../stores';

type Option = {
  title: string;
  option: 'on' | 'off';
};

const options: Option[] = [
  { title: 'Add line numbers to gcode commands', option: 'on' },
  // eslint-disable-next-line quotes
  { title: `Don't add line numbers to gcode commands`, option: 'off' },
];

export const LineNumberingOptions = () => {
  const { values, setValues } = usePlottingPropertiesStore();

  const handleRadioValueChange = (value: string) => setValues({ lineNumbering: value === 'on' });

  return (
    <RadioButton.Group
      value={values.lineNumbering ? 'on' : 'off'}
      onValueChange={handleRadioValueChange}>
      <View>
        {options.map((opt, i) => (
          <RadioOption key={`radio-option-${i}-${opt.option}`} {...opt} />
        ))}
      </View>
    </RadioButton.Group>
  );
};
