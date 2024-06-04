import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Surface } from 'react-native-paper';

import { updateStatus } from '../api';
import { ImagePicker, BreadCrumb, Step, AdjustProperties, Preview, PlotImage } from '../components';
import { useSelectedImageStore, usePlottingPropertiesStore, useControlStore } from '../stores';

import { useToast } from '@/hooks';
import { createSelectors } from '@/stores';
import { PrivateRoutesScreenNavigationProp } from '@/types';

type StepItem = {
  title: string;
};

const steps: StepItem[] = [
  {
    title: 'Select image that you want to plot',
  },
  {
    title: 'Preview',
  },
  {
    title: 'Adjust machine properties',
  },
  {
    title: 'Plot the image',
  },
];

const useSelectedImage = createSelectors(useSelectedImageStore);
const usePlottingProperties = createSelectors(usePlottingPropertiesStore);
const useControl = createSelectors(useControlStore);

export const Plot = () => {
  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();
  const [activeStep, setActiveStep] = useState(0);
  const image = useSelectedImage.use.image();
  const values = usePlottingProperties.use.values();
  const setIsExited = useControl.use.setIsExited();
  const isDisabled = useControl.use.isDisabled();
  const { showToast } = useToast();

  const handleStopPlotImage = async () => {
    const response = await updateStatus({ startPlotting: 'no' });

    if (response) {
      showToast({ type: 'info', text1: 'Plotting is stopped' });
    }
  };

  const handleNext = () => setActiveStep((ps) => ps + 1);
  const handleExit = () => {
    handleStopPlotImage();
    setIsExited(true);
    navigation.navigate('Home');
  };

  return (
    <Surface style={styles.container}>
      <BreadCrumb activeStep={activeStep} />
      <Divider />

      {steps.map(
        ({ title }, i) =>
          i === activeStep && (
            <Step key={`step-item-${title}-${i}`} title={title} step={(i + 1).toString()} />
          ),
      )}

      {activeStep === 0 && <ImagePicker />}
      {activeStep === 1 && <Preview />}
      {activeStep === 2 && <AdjustProperties />}
      {activeStep === 3 && <PlotImage />}

      <View style={styles.buttonContainer}>
        <Button disabled={isDisabled} onPress={handleExit}>
          Exit
        </Button>
        <Button
          mode="contained"
          disabled={
            activeStep === steps.length - 1 || !image.uri || !values.sampleCount || isDisabled
          }
          onPress={handleNext}>
          Next
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  avatarContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  avatarText: { marginLeft: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  container: { height: '100%', padding: 10 },
});
