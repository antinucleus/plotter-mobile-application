import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput } from 'react-native-paper';

import { getMachinePosition, getStatus, moveAxis, movePen, updateStatus } from '../api';
import { DirectionList, ModeList, AutoHomeModal } from '../components';
import { useAxisMovementStore, useAxisPositionStore, usePenPositionStore } from '../stores';

import { FETCH_INTERVAL, MACHINE_AXIS_X_LIMIT, MACHINE_AXIS_Y_LIMIT } from '@/config';
import { useTheme, useToast } from '@/hooks';

export const Home = () => {
  const { colors } = useTheme();
  const { direction, driveMode } = useAxisMovementStore();
  const { penPosition, setPenPosition } = usePenPositionStore();
  const { axisPosition, setAxisPosition } = useAxisPositionStore();
  const { showToast } = useToast();
  const [distance, setDistance] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [fetchPosition, setFetchPosition] = useState(true);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [disableMoveAxisX, setDisableMoveAxisX] = useState(false);
  const [disableMoveAxisY, setDisableMoveAxisY] = useState(false);
  const [isMovingX, setIsMovingX] = useState(false);
  const [isMovingY, setIsMovingY] = useState(false);

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
        setIsMovingX(true);
      } else {
        setIsMovingX(false);
      }

      if (status.isMovingY === 'yes') {
        setIsMovingY(true);
      } else {
        setIsMovingY(false);
      }

      setPenPosition(status.penPosition);
    }
  };

  const getPosition = async () => {
    const position = await getMachinePosition();

    if (position) {
      console.log('Position:', position);
      setAxisPosition({ x: Number(position.x), y: Number(position.y) });
    }
  };

  const setAutoHoming = async () => {
    const response = await updateStatus({ autoHoming: 'yes' });

    if (response) {
      console.log('Set Auto Home Responsee:', response);
      setFetchStatus(true);
    }
  };

  const handlePlotImage = async () => {
    const response = await updateStatus({ startPlotting: 'yes' });

    if (response) {
      showToast({ type: 'info', text1: 'Plotting' });
    }
  };

  useEffect(() => {
    // add positive side section
    if (
      (direction === '-' && axisPosition.x - Number(distance) < 0) ||
      (direction === '+' && axisPosition.x + Number(distance) > MACHINE_AXIS_X_LIMIT)
    ) {
      setDisableMoveAxisX(true);
    } else {
      setDisableMoveAxisX(false);
    }

    // add positive side section
    if (
      (direction === '-' && axisPosition.y - Number(distance) < 0) ||
      (direction === '+' && axisPosition.y + Number(distance) > MACHINE_AXIS_Y_LIMIT)
    ) {
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
        setFetchCounter((pc) => pc + 1);
      }

      if (fetchPosition) {
        getAxisMovementStatus();
        getPosition();
        setFetchCounter((pc) => pc + 1);
      }
    }, FETCH_INTERVAL);

    return () => clearTimeout(timer);
  }, [fetchStatus, fetchPosition, fetchCounter]);

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.surface }]}
      contentContainerStyle={styles.scrollViewContentContainer}>
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
          disabled={disableMoveAxisX || isMovingX}
          theme={{ roundness: 2 }}
          mode="contained"
          onPress={() => handleMoveAxis('x')}>
          Move X Axis
        </Button>
        <Button
          disabled={disableMoveAxisY || isMovingY}
          theme={{ roundness: 2 }}
          mode="contained"
          onPress={() => handleMoveAxis('y')}>
          Move Y Axis
        </Button>
      </View>
      <Divider />
      <View style={styles.plotButtonContainer}>
        <Button theme={{ roundness: 2 }} mode="contained" onPress={handlePlotImage}>
          Plot Image
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  changePenPosition: { justifyContent: 'center' },
  directionText: { marginVertical: 10 },
  moveAxisContainer: { marginVertical: 10 },
  moveAxisTitle: { marginVertical: 10 },
  penControlButtons: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  plotButtonContainer: { marginVertical: 10 },
  scrollView: { flex: 1 },
  scrollViewContentContainer: { padding: 10, justifyContent: 'space-between' },
});
