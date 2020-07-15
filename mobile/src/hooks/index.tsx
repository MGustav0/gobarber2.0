import React from 'react';

import { AuthProvider } from './auth';

const HookProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default HookProvider;
