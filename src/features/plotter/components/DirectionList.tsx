import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { RadioOption } from './RadioOption';

type Direction = 'positive' | 'negative';

type Option = {
  title: string;
  option: Direction;
};

const options: Option[] = [
  { title: 'Positive direction', option: 'positive' },
  { title: 'Negative direction', option: 'negative' },
];

export const DirectionList = () => {
  const [direction, setDirection] = useState<Direction>('positive');

  const handleRadioValueChange = (value: string) => setDirection(value as Direction);

  useEffect(() => {
    console.log({ direction });
  }, [direction]);

  return (
    <RadioButton.Group value={direction} onValueChange={handleRadioValueChange}>
      <View style={styles.optionContainer}>
        {options.map((opt, i) => (
          <RadioOption key={`radio-option-${i}-${opt.option}`} {...opt} />
        ))}
      </View>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  optionContainer: { flexDirection: 'row' },
});
