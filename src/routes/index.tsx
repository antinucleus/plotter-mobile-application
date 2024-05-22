import React from 'react';

import { Private } from './Private';
import { Public } from './Public';

import { useAuthStore } from '@/stores';

export const Routes = () => {
  const { auth } = useAuthStore();

  return auth ? <Private /> : <Public />;
};
