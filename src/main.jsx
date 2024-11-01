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
import SelfTherapy from "./pages/SelfTherapy";
import Affirmations from "./pages/Affirmations";
import CreativeExp from "./pages/CreativeExp";
import Journal from "./pages/Journal";
import StoryPage from "./pages/StoryPage";
import ConsultPage from "./pages/ConsultPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
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
        path: "report-incident",
        element: (
          <PrivateRoute>
            <ReportIncident />
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
      {
        path: "sos-form",
        element: (
          <PrivateRoute>
            <SOSForm />
          </PrivateRoute>
        ),
      },
      {
        path: "journal",
        element: (
          <PrivateRoute>
            <Journal />
          </PrivateRoute>
        ),
      },
      {
        path: "share-story",
        element: (
          <PrivateRoute>
            <StoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: "consult",
        element: (
          <PrivateRoute>
            <ConsultPage />
          </PrivateRoute>
        ),
      },
      {
        path: "self-therapy",
        element: (
          <PrivateRoute>
            <SelfTherapy />
          </PrivateRoute>
        ),
      },
      {
        path: "self-therapy/affirmations",
        element: (
          <PrivateRoute>
            <Affirmations />
          </PrivateRoute>
        ),
      },
      {
        path: "self-therapy/meditation",
        element: (
          <PrivateRoute>
            <Meditate />
          </PrivateRoute>
        ),
      },
      {
        path: "self-therapy/creative-expression",
        element: (
          <PrivateRoute>
            <CreativeExp />
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
