import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Banner, Icon, IconButton, Text } from 'react-native-paper';

type Props = {
  children?: React.ReactElement;
  title: string;
  description: string;
};

export const Label = ({ children, title, description }: Props) => {
  const [showBanner, setShowBanner] = React.useState(false);

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text variant="titleMedium">{title}</Text>
        {children}
        <IconButton
          icon="information"
          selected
          size={20}
          onPress={() => {
            setShowBanner(true);
          }}
        />
      </View>

      <Banner
        visible={showBanner}
        actions={[
          {
            label: 'Close',
            onPress: () => setShowBanner(false),
          },
        ]}
        icon={({ size }) => <Icon source="information" size={size} />}>
        {description}
      </Banner>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
});
