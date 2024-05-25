import { Image } from 'expo-image';
import * as ExpoImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const ImagePicker = () => {
  const [image, setImage] = useState<null | string>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" theme={{ roundness: 2 }} onPress={pickImage}>
        Pick an image
      </Button>
      {image && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            placeholder={{ blurhash }}
            source={{ uri: image }}
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
