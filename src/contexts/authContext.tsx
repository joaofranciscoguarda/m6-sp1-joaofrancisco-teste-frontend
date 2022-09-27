import React, {
  createContext,
  FC,
  useContext,
  useState,
  useCallback,
} from 'react';
import api from '../services/api';

interface AuxProps {
  children: JSX.Element[] | JSX.Element;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  cellphone: string;
  createdAt: string;
  role: string;
  contacts: Contacts[];
}

interface AuthState {
  token: string;
  user: User;
}

interface Contacts {
  id: string;
  fullName: string;
  email: string;
  cellphone: string;
  ownerId: string;
}

interface SignInCredential {
  email: string;
  password: string;
}

interface SignUpCredential {
  email: string;
  password: string;
  fullName: string;
  cellphone: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn: (credentials: SignInCredential) => Promise<void>;
  signUp: (credentials: SignUpCredential) => Promise<void>;
  getInfos: (token: string) => Promise<void>;
  signOff: () => Promise<boolean> | void;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider = ({ children }: AuxProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken =
      localStorage.getItem('@teste:token');
    const user = localStorage.getItem('@teste:user');

    if (accessToken && user) {
      return {
        token: accessToken,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const config = {
    headers: { Authorization: `Bearer ${data.token}` },
  };

  const signIn = useCallback(
    async ({ email, password }: SignInCredential) => {
      const response = await api.post('auth/signin/', {
        email,
        password,
      });
      console.log(response, response.data);
      const { token, user } = response.data;
      localStorage.setItem('@teste:token', token);
      localStorage.setItem(
        '@teste:user',
        JSON.stringify(user),
      );

      setData({ token, user });
    },
    [],
  );

  const signUp = useCallback(
    async ({
      email,
      password,
      cellphone,
      fullName,
    }: SignUpCredential) => {
      const response = await api.post('auth/signup/', {
        email,
        password,
        cellphone,
        fullName,
      });
      console.log(response, response.data);
      const { token, user } = response.data;
      localStorage.setItem('@teste:token', token);
      localStorage.setItem(
        '@teste:user',
        JSON.stringify(user),
      );

      setData({ token, user });
    },
    [],
  );

  const getInfos = useCallback(
    async (token: string) => {
      const responseContacts = await api.get(
        'contact/',
        config,
      );
      const responseUser = await api.get('user/', config);
      const { data } = responseContacts;
      const { user } = responseUser.data;
      localStorage.setItem(
        '@teste:contacts',
        JSON.stringify(data),
      );
      localStorage.setItem(
        '@teste:user',
        JSON.stringify(user),
      );
    },
    [data.token],
  );

  const signOff = () => {
    setData({} as AuthState);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
        signUp,
        getInfos,
        signOff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider',
    );
  }

  return context;
};
