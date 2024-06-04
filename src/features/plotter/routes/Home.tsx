import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput } from 'react-native-paper';

import { getMachinePosition, getStatus, updateStatus } from '../api';
import { DirectionList, ModeList, AutoHomeModal, MovePen } from '../components';
import { MoveAxis } from '../components/MoveAxis';
import {
  useAxisMovementStore,
  useAxisPositionStore,
  useControlStore,
  usePenPositionStore,
} from '../stores';

import { FETCH_INTERVAL, MACHINE_AXIS_X_LIMIT, MACHINE_AXIS_Y_LIMIT } from '@/config';
import { useTheme } from '@/hooks';
import { createSelectors } from '@/stores';
import { PrivateRoutesScreenNavigationProp } from '@/types';

const useAxisMovement = createSelectors(useAxisMovementStore);
const usePenPosition = createSelectors(usePenPositionStore);
const useAxisPosition = createSelectors(useAxisPositionStore);
const useControl = createSelectors(useControlStore);

export const Home = () => {
  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();
  const { colors } = useTheme();
  const direction = useAxisMovement.use.direction();
  const setPenPosition = usePenPosition.use.setPenPosition();
  const axisPosition = useAxisPosition.use.axisPosition();
  const setAxisPosition = useAxisPosition.use.setAxisPosition();
  const isExited = useControl.use.isExited();
  const setIsExited = useControl.use.setIsExited();
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

  const getAutoHome = async () => {
    const status = await getStatus();

    if (status) {
      console.log('AutoHoming:', status.autoHoming);
      if (status.autoHoming === 'no') {
        setFetchStatus(false);
        setShowModal(false);
        setIsExited(false);
      }
    }
  };

  const getAxisMovementStatus = async () => {
    //CHECK HERE
    const status = await getStatus();

    if (status) {
      setIsMovingX(status.isMovingX === 'yes');
      setIsMovingY(status.isMovingY === 'yes');

      setPenPosition(status.penPosition);
    }
  };

  const getPosition = async () => {
    const position = await getMachinePosition();

    if (position) {
      // console.log('Position:', position);
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

  const handlePlotImage = async () => navigation.navigate('Plot');

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
    if (isExited) {
      setShowModal(true);
      setAutoHoming();
    }
  }, [isExited]);

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
      <MovePen />
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
      <MoveAxis
        disableMoveAxisX={disableMoveAxisX}
        disableMoveAxisY={disableMoveAxisY}
        distance={distance}
        isMovingX={isMovingX}
        isMovingY={isMovingY}
      />
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
  directionText: { marginVertical: 10 },
  moveAxisContainer: { marginVertical: 10 },
  moveAxisTitle: { marginVertical: 10 },
  plotButtonContainer: { marginVertical: 10 },
  scrollView: { flex: 1 },
  scrollViewContentContainer: { padding: 10, justifyContent: 'space-between' },
});
