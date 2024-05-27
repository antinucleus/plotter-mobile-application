import { Image } from 'expo-image';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as ExpoImagePicker from 'expo-image-picker';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Button } from 'react-native-paper';

import { useSelectedImageStore } from '../stores';

import { BLURLASH } from '@/config';

export const ImagePicker = () => {
  const { image, setImage } = useSelectedImageStore();

  const pickImage = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const w = result.assets[0].width;
      const h = result.assets[0].height;
      const ar = w / h;

      const newh = 500;

      const manipResult = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { height: newh, width: newh * ar } }],
        {
          compress: 1,
          format: SaveFormat.JPEG,
        },
      );

      const uri =
        Platform.OS === 'android' ? manipResult.uri : manipResult.uri.replace('file://', '');

      const filename = manipResult.uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename as string);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : 'image';

      setImage({ uri, imageType: type, imageName: `image.${ext}` });
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" theme={{ roundness: 2 }} onPress={pickImage}>
        Pick an image
      </Button>
      {image.uri && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            placeholder={{ blurhash: BLURLASH }}
            source={{ uri: image.uri }}
            contentFit="contain"
            transition={500}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    marginVertical: 10,
    width: '100%',
    height: '50%',
  },
});
