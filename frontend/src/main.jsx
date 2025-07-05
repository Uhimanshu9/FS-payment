import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Signup , Signin , Dashboard , Send} from './Pages/index.js'
import {  createBrowserRouter , RouterProvider} from "react-router";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <div>Not Found</div>,
  },
   {
    path: "/send",
    element: <Send />,
    errorElement: <div>Not Found</div>,
  },
   {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <div>Not Found</div>,
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)