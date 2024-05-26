import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { Loading } from './Loading';
import { updateGcodeConfig, uploadImage } from '../api';
import { usePlottingPropertiesStore, useSelectedImageStore } from '../stores';

import { BLURLASH, STATIC_MEDIA_URL } from '@/config';
import { useTheme, useToast } from '@/hooks';

export const Preview = () => {
  const { dark } = useTheme();
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
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      {loading && <Loading message="Generating gcode from image, please wait" />}

      {!loading && <Text variant="labelMedium">Selected Image</Text>}

      {image.uri && !loading && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            placeholder={{ blurhash: BLURLASH }}
            source={{ uri: image.uri }}
            contentFit="contain"
            transition={500}
            cachePolicy="none"
          />
        </View>
      )}

      {!loading && <Text variant="labelMedium">Generated Vector Image</Text>}

      {!loading && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: STATIC_MEDIA_URL }}
            contentFit="contain"
            transition={500}
            style={[styles.image, { tintColor: dark ? 'white' : 'black' }]}
            cachePolicy="none"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 20 },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: 300,
    width: '100%',
  },
});
