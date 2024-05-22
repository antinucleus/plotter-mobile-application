import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

import { darkColors, lightColors } from '@/config/theme';

export const useTheme = () => {
  const colorScheme = useColorScheme();

  const theme: MD3Theme = useMemo(() => {
    const isDark = colorScheme === 'dark';
    const colors = isDark ? darkColors : lightColors;
    const md3Theme = isDark ? MD3DarkTheme : MD3LightTheme;

    return {
      ...md3Theme,
      colors,
    };
  }, [colorScheme]);

  return theme;
};
