import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Divider, Surface } from 'react-native-paper';

import { ImagePicker, BreadCrumb, Step, AdjustProperties } from '../components';

type StepItem = {
  title: string;
};
const steps: StepItem[] = [
  {
    title: 'Select image that you want to plot',
  },
  {
    title: 'Adjust machine properties',
  },
  {
    title: 'Preview',
  },
  {
    title: 'Plot the image',
  },
];

export const Plot = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((ps) => ps + 1);

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
      {activeStep === 1 && <AdjustProperties />}

      <Button disabled={activeStep === steps.length - 1} onPress={handleNext}>
        Next
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  avatarContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  avatarText: { marginLeft: 10 },
  container: { height: '100%', padding: 10 },
});
