import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';

export default function Router() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={'/login'} replace />}
      />
      <Route
        path="/register"
        element={
          token ? (
            <Navigate to={'/'} replace />
          ) : (
            <Register />
          )
        }
      />
      <Route
        path="/login"
        element={
          token ? <Navigate to={'/'} replace /> : <Login />
        }
      />
      <Route
        path="/"
        element={
          token ? (
            <Home />
          ) : (
            <Navigate to={'/login'} replace />
          )
        }
      />
    </Routes>
  );
}
