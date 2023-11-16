import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import './index.css';
import App from './App';
import Error from './Pages/Error';
import Home from './Pages/Home';
import Notifications from './Pages/Notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
    errorElement: <Error />,
  }
])

root.render(<RouterProvider router={appRouter} />);
