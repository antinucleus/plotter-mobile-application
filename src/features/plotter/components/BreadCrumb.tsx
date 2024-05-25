import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BreadCrumbItem } from './BreadCrumbItem';

type Item = {
  title: string;
};

const items: Item[] = [
  {
    title: 'Select Image',
  },
  {
    title: 'Adjust Properties',
  },
  {
    title: 'Preview',
  },
  { title: 'Plot Image' },
];

type Props = {
  activeStep: number;
};

export const BreadCrumb = ({ activeStep }: Props) => {
  return (
    <View style={styles.chipContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentContainer}>
        {items.map(({ title }, i) => (
          <BreadCrumbItem
            key={`bread-crumb-item-${title}-${i}`}
            title={title}
            disabled={i !== activeStep}
            lastItem={i === items.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: { marginBottom: 10 },
  contentContainer: { justifyContent: 'center', alignItems: 'center' },
});
