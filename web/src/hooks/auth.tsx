/* eslint-disable camelcase */
import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
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
      /** Define o cabeçalho (header) com nome "authorization" recebendo o token
       * em todas as requisições autenticadas.
       */
      api.defaults.headers.authorization = `Bearer ${token}`;

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

    /** Define o cabeçalho (header) com nome "authorization" recebendo o token
     * em todas as requisições autenticadas.
     */
    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  /** updatedData: Partial<User> - A callBack pode usar qualquer dos atributos de User,
   * são opcionais. */
  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
