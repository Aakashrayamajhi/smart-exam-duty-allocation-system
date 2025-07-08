import React from 'react';
import './App.css';
import Login from './component/Login';
import Admin from './component/Admin';
import Notification from './component/Notification';
import Availability from './component/Availability';
import Allocate from './component/Allocate';
import Home from './component/Home';
import Feature from './component/Feature';
import About from './component/About';
import Contact from './component/Contact';
import Nav from './component/Nav';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';


import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routing = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <>
          <Nav />
          <Home />
          <About />
          <Contact />
        </>
      </PublicRoute>
    )
  },
  {
    path: "/about",
    element: (
      <PublicRoute>
        <>
          <Nav />
          <About />
        </>
      </PublicRoute>
    )
  },
  {
    path: "/feature",
    element: (
      <PublicRoute>
        <>
          <Nav />
          <Feature />
        </>
      </PublicRoute>
    )
  },
  {
    path: "/contact",
    element: (
      <PublicRoute>
        <>
          <Nav />
          <Contact />
        </>
      </PublicRoute>
    )
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
    children: [
      { path: "notification", element: <Notification /> },
      { path: "faculty", element: <Availability /> },
      { path: "allocate", element: <Allocate /> }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={routing} />
  );
}

export default App;
