import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

type Props = {
  title: string;
  option: string;
};

export const RadioOption = ({ option, title }: Props) => {
  return (
    <View style={styles.container}>
      <RadioButton.Android value={option} />
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
});
