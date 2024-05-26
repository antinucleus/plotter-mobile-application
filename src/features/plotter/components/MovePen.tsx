import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { movePen } from '../api';
import { usePenPositionStore } from '../stores';

import { useToast } from '@/hooks';

export const MovePen = () => {
  const { showToast } = useToast();
  const { penPosition, setPenPosition } = usePenPositionStore();

  const handlePenUp = async () => {
    const result = await movePen({ penPosition: 'up' });

    if (result) {
      console.log({ result });
      setPenPosition('up');
    } else {
      showToast({ type: 'error', text1: 'Pen cannot be moved' });
    }
  };

  const handlePenDown = async () => {
    const result = await movePen({ penPosition: 'down' });

    if (result) {
      console.log({ result });
      setPenPosition('down');
    } else {
      showToast({ type: 'error', text1: 'Pen cannot be moved' });
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Change pen position</Text>
      <View style={styles.penControlButtons}>
        <Button
          disabled={penPosition === 'up'}
          theme={{ roundness: 2 }}
          mode="contained"
          onPress={handlePenUp}>
          Pen up
        </Button>
        <Button
          disabled={penPosition === 'down'}
          theme={{ roundness: 2 }}
          mode="contained"
          onPress={handlePenDown}>
          Pen down
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  penControlButtons: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
});
