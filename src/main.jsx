import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ReportIncident from "./pages/ReportIncident";
import Meditate from "./pages/Meditate";
import PrivateRoute from "./components/PrivateRoute";
import SOSForm from "./pages/SOSForm";
import SOSList from "./pages/SOSContact";
import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute>
       <LandingPage />
    </PublicRoute>,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "home",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "report",
        element: (
          <PrivateRoute>
            <ReportIncident />
          </PrivateRoute>
        ),
      },
      {
        path: "meditate",
        element: (
          <PrivateRoute>
            <Meditate />
          </PrivateRoute>
        ),
      },
      {
        path: "sos-form",
        element: (
          <PrivateRoute>
            <SOSForm />
          </PrivateRoute>
        ),
      },
      {
        path: "sos-list",
        element: (
          <PrivateRoute>
            <SOSList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);