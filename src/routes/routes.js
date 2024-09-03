import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function RoutesConfig() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <MyRoute>
            <Login />
          </MyRoute>
        }
      />
      <Route
        path="*"
        element={
          <MyRoute>
            <Page404 />
          </MyRoute>
        }
      />
    </Routes>
  );
}
