import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  RootLayout,
  HomePage,
  DashboardPage,
  AuthenticationPage,
  ErrorPage,
} from './pages';
import { action as authAction } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';

import { checkAuthLoader, tokenLoader } from './util/auth';

import TodosContextProvider from './store/todos-context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        loader: checkAuthLoader,
      },
      {
        path: 'login',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <TodosContextProvider>
      <RouterProvider router={router} />
    </TodosContextProvider>
  );
}

export default App;
