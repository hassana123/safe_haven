import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ReportIncident from "./pages/ReportIncident";
import Meditate from "./pages/Meditate";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import App from "./App";
import PublicRoute from "./components/PublicRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <App router={router} />
);
