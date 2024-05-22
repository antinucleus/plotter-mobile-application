import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Surface } from 'react-native-paper';

export const Landing = () => {
  return (
    <Surface style={styles.container}>
      <Text>Landing</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
