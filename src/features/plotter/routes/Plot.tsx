import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Surface } from 'react-native-paper';

import { updateStatus } from '../api';
import { ImagePicker, BreadCrumb, Step, AdjustProperties, Preview, PlotImage } from '../components';
import { useSelectedImageStore, usePlottingPropertiesStore, useControlStore } from '../stores';

import { useToast } from '@/hooks';
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

export const Plot = () => {
  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();
  const [activeStep, setActiveStep] = useState(0);
  const { image } = useSelectedImageStore();
  const { values } = usePlottingPropertiesStore();
  const { setIsExited, isDisabled } = useControlStore();
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
  container: { height: '100%', padding: 10 },
  avatarContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  avatarText: { marginLeft: 10 },
});
