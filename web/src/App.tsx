import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GLobalStyle from './styles/global';

import HookProvider from './hooks';

const App: React.FC = () => (
  <>
    <HookProvider>
      <SignIn />
    </HookProvider>

    <GLobalStyle />
  </>
);

export default App;
