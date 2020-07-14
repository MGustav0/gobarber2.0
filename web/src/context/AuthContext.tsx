import React, { createContext, useCallback, useState } from 'react';

import api from '../services/apiClient';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/** Tudo o que o componente AuthProvider receber como filho, repassa-se dentro do
 * AuthContext.Provider
 */
const AuthProvider: React.FC = ({ children }) => {
  /** Busca os dados de login no localStorage, executa apenas em caso de refresh ou
   * quando o usuário fechar a aplicação
   */
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    /** Caso não encontre o localStorage com os campos vazios, não retorna nada */
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    /** Armazena o token no localStorage */
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
