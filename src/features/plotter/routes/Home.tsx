import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Divider,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';

import { getStatus, moveAxis, movePen } from '../api';
import { DirectionList, ModeList } from '../components';
import { AutoHomeModal } from '../components/AutoHomeModal';
import { useAxisMovementStore, usePenPositionStore } from '../stores';

import { useToast } from '@/hooks';

export const Home = () => {
  const { direction, driveMode } = useAxisMovementStore();
  const [distance, setDistance] = useState('');
  const [showModal, setShowModal] = useState(false);
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

  const handleMoveAxis = async (axis: string) => {
    const response = await moveAxis({
      direction,
      isMovingX: axis === 'x' ? 'yes' : 'no',
      isMovingY: axis === 'y' ? 'yes' : 'no',
      targetDistanceX: axis === 'x' ? Number(distance) : 0,
      targetDistanceY: axis === 'y' ? Number(distance) : 0,
    });

    console.log({ response });
  };

  const getAutoHome = async () => {
    const status = await getStatus();

    if (status) {
      console.log('STATUS:', status);
    }
  };

  return (
    <Surface style={styles.container}>
      <AutoHomeModal showModal={showModal} />
      <Button onPress={getAutoHome}>Get Status</Button>
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
        <Text style={styles.moveAxisTitle} variant="titleMedium">
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
        <Button theme={{ roundness: 2 }} mode="contained" onPress={handlePenDown}>
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
  modalContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalContentContainer: {
    flex: 1 / 4,
    margin: 10,
  },
  moveAxisContainer: { marginVertical: 10 },
  moveAxisTitle: { marginVertical: 10 },
  penControlButtons: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
});
