import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

type Props = {
  message: string;
};

export const Loading = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} variant="labelMedium">
        {message}
      </Text>
      <ActivityIndicator animating />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 10 },
});
