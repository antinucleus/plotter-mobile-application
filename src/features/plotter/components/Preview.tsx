import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput } from 'react-native-paper';

import { Label } from './Label';
import { Loading } from './Loading';
import { convertImagetoSvg, uploadImage } from '../api';
import { useControlStore, useSelectedImageStore } from '../stores';

import { BLURLASH, STATIC_MEDIA_URL } from '@/config';
import { useTheme, useToast } from '@/hooks';
import { createSelectors } from '@/stores';

const useSelectedImage = createSelectors(useSelectedImageStore);
const useControl = createSelectors(useControlStore);

export const Preview = () => {
  const { dark } = useTheme();
  const image = useSelectedImage.use.image();
  const isDisabled = useControl.use.isDisabled();
  const setIsDisabled = useControl.use.setIsDisabled();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [svgDetailLevel, setSvgDetailLevel] = useState('30');

  const handleSvgDetailLevelChange = (v: string) => {
    const num = Number(v);

    if (isNaN(num)) return;

    if (num < 10 || num > 80) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    setSvgDetailLevel(v);
  };

  const handleUploadImage = async () => {
    if (image) {
      const formData = new FormData();

      formData.append('image', {
        uri: image.uri,
        name: image.imageName,
        type: image.imageType,
      } as any);

      try {
        const response = await uploadImage({ image: formData });
        console.log({ response });
      } catch (error) {
        console.log('ERROR UPLOADING:', error);
        showToast({ type: 'error', text1: 'Image did not uploaded' });
      }
    }
  };

  const handleGenerateSvg = async () => {
    setLoading(true);
    setIsConverted(false);

    try {
      const isConverted = await convertImagetoSvg({ detailLevel: Number(svgDetailLevel) });
      console.log({ isConverted });

      if (isConverted) {
        setIsConverted(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('ERROR SVG GENERATION:', error);
      showToast({ type: 'error', text1: 'Svg did not generated' });
    }
  };

  useEffect(() => {
    handleUploadImage();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Label
        title="Enter svg detail level"
        description="This value determines how svg file will be detailed. Lower values will generate higher detailed svg file."
      />
      <TextInput
        style={styles.detailInput}
        keyboardType="number-pad"
        mode="outlined"
        label="Svg detail level"
        value={svgDetailLevel}
        onChangeText={handleSvgDetailLevelChange}
        error={Number(svgDetailLevel) < 10 || Number(svgDetailLevel) > 80}
      />
      <HelperText type="error" visible={Number(svgDetailLevel) < 10 || Number(svgDetailLevel) > 80}>
        {Number(svgDetailLevel) < 10 && 'Detail level cannot be smaller than 10'}
        {Number(svgDetailLevel) > 80 && 'Detail level cannot be bigger than 80'}
      </HelperText>

      <Button
        theme={{ roundness: 2 }}
        style={styles.generateSvgButton}
        mode="contained"
        loading={loading}
        disabled={loading || isDisabled}
        onPress={handleGenerateSvg}>
        Generate Svg
      </Button>

      <Divider />
      {image.uri && (
        <View style={styles.imageOuterContainer}>
          <Text variant="titleSmall">Selected Image</Text>
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
        </View>
      )}

      {loading ? (
        <Loading message="Generating svg file from image, please wait" />
      ) : (
        isConverted && (
          <View style={styles.imageOuterContainer}>
            <Text variant="titleSmall">Generated Vector Image</Text>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: STATIC_MEDIA_URL }}
                contentFit="contain"
                transition={500}
                style={[styles.image, { tintColor: dark ? 'white' : 'black' }]}
                cachePolicy="none"
              />
            </View>
          </View>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 5 },
  contentContainer: { justifyContent: 'center' },
  detailInput: { marginTop: 10 },
  generateSvgButton: { width: '50%', alignSelf: 'center', marginBottom: 10 },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: 300,
    width: '100%',
    marginVertical: 30,
  },
  imageOuterContainer: { alignItems: 'center', marginTop: 10 },
});
