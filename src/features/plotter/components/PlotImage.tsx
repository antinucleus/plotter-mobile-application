import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Loading } from './Loading';
import { getMachinePosition, getStatus, updateStatus } from '../api';
import { useAxisPositionStore, useControlStore } from '../stores';

import { FETCH_INTERVAL } from '@/config';
import { useToast } from '@/hooks';

export const PlotImage = () => {
  const { showToast } = useToast();
  const { axisPosition, setAxisPosition } = useAxisPositionStore();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [fetchPosition, setFetchPosition] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);
  const { isDisabled, setIsDisabled } = useControlStore();

  const handleStartPlotImage = async () => {
    const response = await updateStatus({ startPlotting: 'yes' });
    console.log('START RESP:', response);
    if (response) {
      showToast({ type: 'info', text1: 'Plotting' });
      setIsDisabled(true);
    }
  };

  const handleStopPlotImage = async () => {
    const response = await updateStatus({ startPlotting: 'no' });

    if (response) {
      showToast({ type: 'info', text1: 'Plotting is stopped' });
      setFetchPosition(false);
      setIsDisabled(false);
    }
  };

  const getStartPlottingStatus = async () => {
    const status = await getStatus();

    if (status) {
      if (status.startPlotting === 'no') {
        setIsDisabled(false);
        setFetchPosition(false);
      }
    }
  };

  const getAutoHomeStatus = async () => {
    const status = await getStatus();

    if (status) {
      console.log('AutoHoming:', status.autoHoming);

      if (status.autoHoming === 'no') {
        handleStartPlotImage();
        setFetchStatus(false);
        setFetchPosition(true);
      }
    }
  };

  const setAutoHoming = async () => {
    const response = await updateStatus({ autoHoming: 'yes' });

    if (response) {
      console.log('Set Auto Home Responsee:', response);
      setFetchStatus(true);
    }
  };

  const getPosition = async () => {
    const position = await getMachinePosition();

    if (position) {
      console.log('Position:', position);
      setAxisPosition({ x: Number(position.x), y: Number(position.y) });
    }
  };

  const handleStartPlotting = () => {
    setAutoHoming();
  };

  const handleStopPlotting = () => {
    handleStopPlotImage();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fetchStatus) {
        getAutoHomeStatus();
        setFetchCounter((pc) => pc + 1);
      }

      if (fetchPosition) {
        getPosition();
        getStartPlottingStatus();
        setFetchCounter((pc) => pc + 1);
      }
    }, FETCH_INTERVAL);

    return () => clearTimeout(timer);
  }, [fetchStatus, fetchPosition, fetchCounter]);

  return (
    <View style={styles.container}>
      {fetchStatus && <Loading message="Auto homing" />}

      {fetchPosition && <Text variant="labelLarge">Plotting image</Text>}

      {fetchPosition && (
        <View style={styles.positionTextContainer}>
          <Text variant="titleMedium">Pen Position X: {axisPosition.x} </Text>
          <Text variant="titleMedium">Pen Position Y: {axisPosition.y} </Text>
        </View>
      )}
      {fetchPosition && (
        <Button onPress={handleStopPlotting} theme={{ roundness: 2 }} mode="contained">
          Stop Plotting
        </Button>
      )}
      <Button disabled={isDisabled} onPress={handleStartPlotting}>
        Start Plotting
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 10 },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  positionTextContainer: { flexDirection: 'column' },
});
