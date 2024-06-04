import React from 'react';

import { Private } from './Private';
import { Public } from './Public';

import { createSelectors, useAuthStore } from '@/stores';

const useAuth = createSelectors(useAuthStore);

export const Routes = () => {
  const auth = useAuth.use.auth();

  return auth ? <Private /> : <Public />;
};
