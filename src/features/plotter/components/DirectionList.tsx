import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { RadioOption } from './RadioOption';
import { useAxisMovementStore } from '../stores';

import { Direction } from '@/features/types';
import { createSelectors } from '@/stores';

type Option = {
  title: string;
  option: Direction;
};

const options: Option[] = [
  { title: 'Positive direction', option: '+' },
  { title: 'Negative direction', option: '-' },
];

const useAxisMovement = createSelectors(useAxisMovementStore);

export const DirectionList = () => {
  const direction = useAxisMovement.use.direction();
  const setDirection = useAxisMovement.use.setDirection();

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
