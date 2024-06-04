import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { moveAxis } from '../api';
import { useAxisMovementStore } from '../stores';

import { createSelectors } from '@/stores';

type Props = {
  disableMoveAxisX: boolean;
  disableMoveAxisY: boolean;
  isMovingX: boolean;
  isMovingY: boolean;
  distance: string;
};

const useAxisMovement = createSelectors(useAxisMovementStore);

export const MoveAxis = ({
  disableMoveAxisX,
  disableMoveAxisY,
  isMovingX,
  isMovingY,
  distance,
}: Props) => {
  const direction = useAxisMovement.use.direction();
  const driveMode = useAxisMovement.use.driveMode();

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

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
});
