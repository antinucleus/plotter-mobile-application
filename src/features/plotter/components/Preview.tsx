import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { updateGcodeConfig, uploadImage } from '../api';
import { usePlottingPropertiesStore, useSelectedImageStore } from '../stores';

import { useToast } from '@/hooks';

export const Preview = () => {
  const { values } = usePlottingPropertiesStore();
  const { image } = useSelectedImageStore();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

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

  const handleUploadImage = async () => {
    setLoading(true);
    if (image) {
      const formData = new FormData();

      formData.append('image', {
        uri: image.uri,
        name: image.imageName,
        type: image.imageType,
      } as any);

      try {
        const response = await uploadImage({ image: formData });

        if (response) {
          console.log({ response });
          setLoading(false);
        }
      } catch (error) {
        showToast({ type: 'error', text1: 'Image did not uploaded' });
      }
    }
  };

  useEffect(() => {
    handleUpdateConfig();

    setTimeout(() => {
      handleUploadImage();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View>
          <Text style={styles.text} variant="labelMedium">
            Generating gcode from image, please wait
          </Text>
          <ActivityIndicator animating />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 10 },
});
