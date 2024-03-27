import React from 'react';
import reportWebVitals from './reportWebVitals';
import {createRoot} from "react-dom/client"
import { Provider } from 'react-redux';
import { store } from './app/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Paths } from './paths';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ConfigProvider, theme } from 'antd';

import "./index.css"


const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <h1>Home</h1>
  },
  {
    path: Paths.login,
    element: <Login/>
  },
  {
    path: Paths.register,
    element: <Register/>
  }
])
const container = document.getElementById("root")!;
const root = createRoot(container);


  root.render(
    <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm
      }}>
        <RouterProvider router={ router}/>
      </ConfigProvider>
    </Provider>
    </React.StrictMode>
  );

reportWebVitals();
 
