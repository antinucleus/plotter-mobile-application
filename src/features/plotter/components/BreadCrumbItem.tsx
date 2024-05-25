import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip, Icon } from 'react-native-paper';

type Props = {
  title: string;
  disabled: boolean;
  lastItem: boolean;
};

export const BreadCrumbItem = ({ title, disabled, lastItem }: Props) => {
  return (
    <>
      <Chip
        style={styles.chip}
        mode="outlined"
        disabled={disabled}
        textStyle={styles.chipText}
        // avatar={<Icon source="roman-numeral-1" size={30} />}
      >
        {title}
      </Chip>
      {!lastItem && <Icon source="chevron-right" size={30} />}
    </>
  );
};

const styles = StyleSheet.create({
  chip: { marginHorizontal: 2, padding: 0 },
  chipText: { fontSize: 12 },
});
