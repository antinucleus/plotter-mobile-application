import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Surface, Text, TextInput } from 'react-native-paper';

import { getMachinePosition, getStatus, moveAxis, movePen, updateStatus } from '../api';
import { DirectionList, ModeList } from '../components';
import { AutoHomeModal } from '../components/AutoHomeModal';
import { useAxisMovementStore, useAxisPositionStore, usePenPositionStore } from '../stores';

import { useToast } from '@/hooks';

export const Home = () => {
  const { direction, driveMode } = useAxisMovementStore();
  const { penPosition, setPenPosition } = usePenPositionStore();
  const { axisPosition, setAxisPosition } = useAxisPositionStore();
  const { showToast } = useToast();
  const [distance, setDistance] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [fetchPosition, setFetchPosition] = useState(true);
  const [fetchCount, setFetchCount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [disableMoveAxisX, setDisableMoveAxisX] = useState(false);
  const [disableMoveAxisY, setDisableMoveAxisY] = useState(false);

  const handleDistanceInputChange = (e: string) => {
    if (isNaN(Number(e))) return;

    // add positive side section
    if (direction === '-' && axisPosition.x - Number(e) < 0) {
      setShowError(true);
      setDisableMoveAxisX(true);
    } else {
      setDisableMoveAxisX(false);
    }

    // add positive side section
    if (direction === '-' && axisPosition.y - Number(e) < 0) {
      setShowError(true);
      setDisableMoveAxisY(true);
    } else {
      setDisableMoveAxisY(false);
    }

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
      driveMode,
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
      console.log('AutoHoming:', status.autoHoming);
      if (status.autoHoming === 'no') {
        setFetchStatus(false);
        setShowModal(false);
      }
    }
  };

  const getAxisMovementStatus = async () => {
    //CHECK HERE
    const status = await getStatus();

    if (status) {
      if (status.isMovingX === 'yes') {
        setDisableMoveAxisX(true);
      } else {
        setDisableMoveAxisX(false);
      }

      if (status.isMovingY === 'yes') {
        setDisableMoveAxisY(true);
      } else {
        setDisableMoveAxisY(false);
      }
    }
  };

  const getPosition = async () => {
    const position = await getMachinePosition();

    if (position) {
      console.log('Position:', position);
      setAxisPosition(position);
    }
  };

  const setAutoHoming = async () => {
    const response = await updateStatus({ autoHoming: 'yes' });

    if (response) {
      console.log('Set Auto Home Response:', response);
      setFetchStatus(true);
    }
  };

  useEffect(() => {
    // add positive side section
    if (direction === '-' && axisPosition.x - Number(distance) < 0) {
      setShowError(true);
      setDisableMoveAxisX(true);
    } else {
      setDisableMoveAxisX(false);
    }

    // add positive side section
    if (direction === '-' && axisPosition.y - Number(distance) < 0) {
      setShowError(true);
      setDisableMoveAxisY(true);
    } else {
      setDisableMoveAxisY(false);
    }
  }, [direction, axisPosition, distance]);

  useEffect(() => {
    setAutoHoming();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fetchStatus) {
        getAutoHome();
        setFetchCount((pc) => pc + 1);
      }

      if (fetchPosition) {
        // getAxisMovementStatus();
        getPosition();
        setFetchCount((pc) => pc + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchStatus, fetchPosition, fetchCount]);

  return (
    <Surface style={styles.container}>
      <AutoHomeModal showModal={showModal} />
      <Button onPress={getAutoHome}>Get AutoHome Status</Button>
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
          error={disableMoveAxisX || disableMoveAxisY}
          onChangeText={handleDistanceInputChange}
        />
        <HelperText type="error" visible={disableMoveAxisX || disableMoveAxisY}>
          You cannot exceed the machine axis limit
        </HelperText>
        <Text style={styles.directionText} variant="titleMedium">
          Select movement direction
        </Text>
        <DirectionList />
      </View>

      <View style={styles.penControlButtons}>
        <Button
          disabled={disableMoveAxisX}
          theme={{ roundness: 2 }}
          mode="contained"
          onPress={() => handleMoveAxis('x')}>
          Move X Axis
        </Button>
        <Button
          disabled={disableMoveAxisY}
          theme={{ roundness: 2 }}
          mode="contained"
          onPress={() => handleMoveAxis('y')}>
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
  moveAxisContainer: { marginVertical: 10 },
  moveAxisTitle: { marginVertical: 10 },
  penControlButtons: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
});
