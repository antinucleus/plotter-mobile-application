import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Modal, Portal, Surface, Text } from 'react-native-paper';

type Props = {
  showModal: boolean;
};

export const AutoHomeModal = ({ showModal }: Props) => {
  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modalContentContainer}
        visible={showModal}
        dismissable={false}>
        <Surface style={styles.modalContent}>
          <Text style={styles.loadingText} variant="titleMedium">
            Auto homing please wait
          </Text>
          <ActivityIndicator size="small" />
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  loadingText: { marginBottom: 10 },
  modalContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalContentContainer: {
    margin: 10,
    flex: 1 / 4,
  },
});
