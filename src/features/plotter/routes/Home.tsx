import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Surface, Text, TextInput } from 'react-native-paper';

import { movePen } from '../api';
import { DirectionList, ModeList } from '../components';
import { usePenPositionStore } from '../stores';

import { useToast } from '@/hooks';

export const Home = () => {
  const [distance, setDistance] = useState('');
  const { penPosition, setPenPosition } = usePenPositionStore();
  const { showToast } = useToast();

  const handleDistanceInputChange = (e: string) => {
    if (isNaN(Number(e))) return;

    setDistance(e);
  };

  const handlePenUp = async () => {
    const result = await movePen({ penPosition: 'up' });

    if (result) {
      console.log({ result });
      setPenPosition('up');
    } else {
      showToast({ type: 'error', text1: 'Pen can not moved' });
    }
  };

  const handlePenDown = async () => {
    const result = await movePen({ penPosition: 'down' });

    if (result) {
      console.log({ result });
      setPenPosition('down');
    } else {
      showToast({ type: 'error', text1: 'Pen can not moved' });
    }
  };

  const handleMoveAxis = async (axis: string) => {};

  return (
    <Surface style={styles.container}>
      <View style={styles.changePenPosition}>
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
      <Divider />
      <View style={styles.moveAxisContainer}>
        <Text variant="titleMedium">Select movement mode</Text>
        <ModeList />
        <Text style={styles.moveAxisTitle} variant="titleSmall">
          Enter the distance you want to move axis in mm
        </Text>
        <TextInput
          label="Distance"
          keyboardType="numeric"
          placeholder="Enter the distance"
          autoCorrect={false}
          mode="outlined"
          value={distance}
          onChangeText={handleDistanceInputChange}
        />
        <Text style={styles.directionText} variant="titleMedium">
          Select movement direction
        </Text>
        <DirectionList />
      </View>

      <View style={styles.penControlButtons}>
        <Button theme={{ roundness: 2 }} mode="contained" onPress={() => handleMoveAxis('x')}>
          Move X Axis
        </Button>
        <Button theme={{ roundness: 2 }} mode="contained" onPress={() => handleMoveAxis('y')}>
          Move Y Axis
        </Button>
      </View>
      <Divider />

      <View>
        <Button
          disabled={penPosition === 'down'}
          theme={{ roundness: 2 }}
          mode="contained"
          onPress={handlePenDown}>
          Plot Image
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  changePenPosition: { justifyContent: 'center' },
  container: { height: '100%', padding: 10, justifyContent: 'space-between' },
  directionText: { marginVertical: 10 },
  moveAxisContainer: { marginVertical: 10 },
  moveAxisTitle: { marginVertical: 10 },
  penControlButtons: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
});
