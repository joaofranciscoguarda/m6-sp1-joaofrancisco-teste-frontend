import React, { FC } from 'react';
import { AuthProvider } from './authContext';

interface AuxProps {
  children: JSX.Element[] | JSX.Element;
}

const AppProvider = ({ children }: AuxProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
