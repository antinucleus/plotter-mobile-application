import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import { CustomSwitch } from './CustomSwitch';
import { Label } from './Label';
import { generateGcode, getGcode, updateGcodeConfig } from '../api';
import { usePlottingPropertiesStore } from '../stores';

export const AdjustProperties = () => {
  const { values, setValues } = usePlottingPropertiesStore();

  const handleLineNumberingChange = () => setValues({ lineNumbering: !values.lineNumbering });
  const handleFillChange = () => setValues({ fill: !values.fill });
  const handleCurveSmoothnessChange = (v: string) => {
    if (isNaN(Number(v))) return;

    setValues({ sampleCount: v });
  };

  const handleUpdateConfig = async () => {
    try {
      const res = await updateGcodeConfig(values);

      if (res) {
        console.log('RES:', res);
      }
    } catch (error) {
      console.log('ERR:', error);
    }
  };

  const handleGenerateGcode = async () => {
    try {
      const isGenerated = await generateGcode();
      console.log({ isGenerated });
    } catch (error) {
      console.log('ERROR GENERATE GCODE:', error);
    }
  };

  const handleGetGcode = async () => {
    try {
      const gcode = await getGcode();
      console.log({ gcode });
    } catch (error) {
      console.log('ERROR GET GCODE:', error);
    }
  };

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  curveSmoothnessInput: { marginVertical: 10 },
});
