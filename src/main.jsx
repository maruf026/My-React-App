import { createRoot } from "react-dom/client";
import { StrictMode } from 'react'


import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";

import DashboardWithTheme from "./dashboard/Layout";
import Inbox from "./dashboard/Users";


const router= createBrowserRouter([
{
  path:'/',
  element:<DashboardWithTheme/>,
  children:[
    {
      path:'/',
      element:<Inbox/>
    }
  ]
}
])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
