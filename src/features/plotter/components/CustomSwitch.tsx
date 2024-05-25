import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

type Props = {
  title: string;
  switchValue: boolean;
  onSwitchChange: () => void;
};

export const CustomSwitch = ({ title, switchValue, onSwitchChange }: Props) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium"> {title} </Text>
      <Switch value={switchValue} onValueChange={onSwitchChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
});
