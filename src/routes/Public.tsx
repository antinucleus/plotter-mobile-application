import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Landing } from '@/features/public/routes';
import { PublicRoutesStackParamList } from '@/types';

const { Navigator, Screen } = createNativeStackNavigator<PublicRoutesStackParamList>();

export const Public = () => {
  return (
    <Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      <Screen name="Landing" component={Landing} />
    </Navigator>
  );
};
