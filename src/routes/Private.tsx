import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Home, Plot } from '@/features/plotter/routes';
import { PrivateRoutesStackParamList } from '@/types';

const { Navigator, Screen } = createNativeStackNavigator<PrivateRoutesStackParamList>();

export const Private = () => {
  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Plot" component={Plot} />
    </Navigator>
  );
};
