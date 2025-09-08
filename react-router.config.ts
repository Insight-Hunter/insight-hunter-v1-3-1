import { lazy } from "react";
import Layout from "./src/components/Layout";
import NotFound from "./src/pages/NotFound";
import Welcome from "./src/components/Welcome";

const Dashboard = lazy(() => import("./src/pages/Dashboard"));
const Forecast = lazy(() => import("./src/pages/Forecast"));
const Analytics = lazy(() => import("./src/pages/Analytics"));
const Reports = lazy(() => import("./src/pages/Reports"));
const Cashflow = lazy(() => import("./src/pages/Cashflow"));
const ClientPortal = lazy(() => import("./src/pages/ClientPortal"));
const Settings = lazy(() => import("./src/pages/Settings"));
const SignIn = lazy(() => import("./src/pages/SignIn"));
const SignUp = lazy(() => import("./src/pages/SignUp"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "forecast", element: <Forecast /> },
      { path: "analytics", element: <Analytics /> },
      { path: "clientportal", element: <ClientPortal /> },
      { path: "reports", element: <Reports /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> }, // Check if this is correct
      { path: "cashflow", element: <Cashflow /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
