import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PrivateRoutesStackParamList = {
  Home: undefined;
  Plot: undefined;
};

export type PrivateRoutesScreenNavigationProp =
  NativeStackNavigationProp<PrivateRoutesStackParamList>;
