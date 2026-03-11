import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { Testimonies } from './pages/Testimonies';
import { About } from './pages/About.tsx';
import { Contribuez } from './pages/Contribuez.tsx';
import { Layout } from './components/Layout';
import './tailwind.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'temoignages', element: <Testimonies /> },
      { path: 'apropos', element: <About /> },
      { path: 'contribuez', element: <Contribuez /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
