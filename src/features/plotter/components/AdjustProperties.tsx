import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput } from 'react-native-paper';

import { CustomSwitch } from './CustomSwitch';
import { Label } from './Label';
import { generateGcode, getGcode, updateGcodeConfig } from '../api';
import { useControlStore, usePlottingPropertiesStore } from '../stores';

import { useTheme } from '@/hooks';

export const AdjustProperties = () => {
  const { colors } = useTheme();
  const { values, setValues } = usePlottingPropertiesStore();
  const { setIsDisabled } = useControlStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const [gcodes, setGcodes] = useState('');

  const handleLineNumberingChange = () => setValues({ lineNumbering: !values.lineNumbering });
  const handleFillChange = () => setValues({ fill: !values.fill });
  const handleCurveSmoothnessChange = (v: string) => {
    if (isNaN(Number(v))) return;

    setValues({ sampleCount: v });
  };

  const handleGenerateGcode = async () => {
    setIsGenerating(true);
    setIsDisabled(false);
    setIsGenerated(false);

    try {
      const res = await updateGcodeConfig(values);

      if (res) {
        const isGenerated = await generateGcode();
        console.log({ isGenerated });
        setIsGenerating(false);
        setIsGenerated(true);
      }
    } catch (error) {
      setIsGenerating(false);

      console.log('ERROR GENERATE GCODE:', error);
    }
  };

  const handleGetGcode = async () => {
    try {
      const gcode = await getGcode();
      const str = gcode.split('\n').splice(0, 500).join('\n');
      setGcodes(str);
    } catch (error) {
      console.log('ERROR GET GCODE:', error);
    }
  };

  useEffect(() => {
    setIsDisabled(true);
  }, [values]);

  return (
    <ScrollView>
      <Label
        title="Enter curve smoothness"
        description="This value determines how smooth the curves will be. Lower values ​​allow curves to be drawn by determining fewer samples and reduce the number of corners in the curves, therefore the resolution is low. If it is 0 default value (30) will be taken"
      />

      <TextInput
        style={styles.curveSmoothnessInput}
        keyboardType="number-pad"
        mode="outlined"
        label="Curve smoothness"
        placeholder="Enter curve smoothness"
        value={values.sampleCount.toString()}
        onChangeText={handleCurveSmoothnessChange}
        error={!values.sampleCount}
      />

      <HelperText type="error" visible={!values.sampleCount}>
        Curve smoothness value cannot be empty
      </HelperText>

      <Label
        title="Add line numbers"
        description="If this is enabled, line numbers will be added to the beginning of each gcode commands."
        children={
          <CustomSwitch
            title=""
            switchValue={values.lineNumbering}
            onSwitchChange={handleLineNumberingChange}
          />
        }
      />

      <Label
        title="Fill bed"
        description="If this is enabled, gcode is generated to completely fill the width and height of the machine bed without preserving the aspect ratio of the selected image to be drawn."
        children={
          <CustomSwitch title="" switchValue={values.fill} onSwitchChange={handleFillChange} />
        }
      />

      <View style={styles.buttonContainer}>
        <Button
          loading={isGenerating}
          disabled={isGenerating}
          theme={{ roundness: 2 }}
          mode="contained"
          onPress={handleGenerateGcode}>
          Generate Gcode
        </Button>
      </View>

      <Divider />

      {isGenerated && (
        <View>
          <Button onPress={handleGetGcode}>Show Generated Gcode</Button>
          <View style={[styles.gcodeContainer, { borderColor: colors.inverseSurface }]}>
            <Text style={styles.title}>First 500 Lines</Text>
            <Divider />
            <ScrollView>
              <Text variant="labelLarge">{gcodes}</Text>
            </ScrollView>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { alignItems: 'center', marginVertical: 30 },
  curveSmoothnessInput: { marginVertical: 10 },
  gcodeContainer: {
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  title: { alignSelf: 'center', marginBottom: 10 },
});
