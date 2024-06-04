import * as Network from 'expo-network';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, Title } from 'react-native-paper';

import { checkDevice } from '../api';

import { useToast } from '@/hooks';
import { useAuthStore } from '@/stores';

export const Landing = () => {
  const { setAuth } = useAuthStore();
  const { showToast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const getConnectionType = async () => {
    setIsConnecting(true);

    const networkState = await Network.getNetworkStateAsync();

    if (!networkState.isConnected) {
      showToast({
        type: 'error',
        text1: 'Connection Error',
        text2: 'Please connect your wifi to the plotter hotspot',
      });

      setIsConnecting(false);

      return;
    }

    if (networkState.isConnected) {
      const result = await checkDevice();

      if (result) {
        showToast({
          type: 'success',
          text1: 'Connection Success',
          text2: 'Successfully connected to the plotter',
        });

        setAuth(true);
      } else {
        showToast({
          type: 'error',
          text1: 'Connection Failed',
          text2: 'Could not connect to the plotter',
        });
      }
    }

    setIsConnecting(false);
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.titleContainer}>
        <Title>Plotter Machine Controller</Title>
        <Text>You have to connect to the plotter machine first</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          theme={{ roundness: 2 }}
          mode="contained"
          loading={isConnecting}
          disabled={isConnecting}
          onPress={getConnectionType}>
          Check Connection
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  button: { marginVertical: 10 },
  buttonContainer: { flex: 1, justifyContent: 'center' },
  container: {
    padding: 10,
    height: '100%',
    alignItems: 'center',
  },
  titleContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
