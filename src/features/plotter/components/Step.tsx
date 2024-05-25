import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

type Props = {
  title: string;
  step: string;
};

export const Step = ({ title, step }: Props) => {
  return (
    <View style={styles.avatarContainer}>
      <Avatar.Text size={24} label={step} />
      <Text style={styles.avatarText} variant="titleSmall">
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  avatarText: { marginLeft: 10 },
  container: { height: '100%', padding: 10 },
});
