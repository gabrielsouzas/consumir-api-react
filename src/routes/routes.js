import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';

export default function RoutesConfig() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <MyRoute isClosed={false}>
            <Alunos />
          </MyRoute>
        }
      />
      <Route
        exact
        path="/aluno/:id/edit"
        element={
          <MyRoute isClosed>
            <Aluno />
          </MyRoute>
        }
      />
      <Route
        exact
        path="/aluno/"
        element={
          <MyRoute isClosed>
            <Aluno />
          </MyRoute>
        }
      />
      <Route
        exact
        path="/fotos/:id"
        element={
          <MyRoute isClosed>
            <Fotos />
          </MyRoute>
        }
      />
      <Route
        exact
        path="/login/"
        element={
          <MyRoute isClosed={false}>
            <Login />
          </MyRoute>
        }
      />
      <Route
        exact
        path="/register/"
        element={
          <MyRoute isClosed={false}>
            <Register />
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
