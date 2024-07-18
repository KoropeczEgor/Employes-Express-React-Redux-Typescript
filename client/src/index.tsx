import React from 'react';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Paths } from './paths';
import { Login } from './pages/login';
import { Employee } from './pages/employee';
import { Employees } from './pages/employees';
import { Status } from './pages/status';
import { Register } from './pages/register';
import { ConfigProvider, theme } from 'antd';

import './index.css';
import { AddEmployee } from './pages/add-employee';
import { EditEmployee } from './pages/edit-employee';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.empolyeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <EditEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
]);
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
