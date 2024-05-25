import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Home, Plot } from '@/features/plotter/routes';
import { PrivateRoutesStackParamList } from '@/types';

const { Navigator, Screen } = createNativeStackNavigator<PrivateRoutesStackParamList>();

export const Private = () => {
  return (
    <Navigator initialRouteName="Plot" screenOptions={{ headerShown: false }}>
      <Screen name="Plot" component={Plot} />
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};
