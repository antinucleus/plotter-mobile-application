import React from 'react';

import { Private } from './Private';
import { Public } from './Public';

export const Routes = () => {
  const auth = false;

  return auth ? <Private /> : <Public />;
};
