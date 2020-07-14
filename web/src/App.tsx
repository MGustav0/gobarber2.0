import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GLobalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <GLobalStyle />
  </>
);

export default App;
