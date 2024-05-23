import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

export const Plot = () => {
  return (
    <View style={styles.container}>
      <Text>Hellos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'lightblue' },
});
