import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Welcome from "./components/Welcome"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ClientRequest } from "http";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Forecast  = lazy(() => import("./pages/Forecast"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Reports   = lazy(() => import("./pages/Reports"));
const Cashflow  = lazy(() => import("./pages/Cashflow"));
const ClientPortal = lazy(() => import("./pages/ClientPortal"));
const Settings  = lazy(() => import("./pages/Settings"));
const SignIn    = lazy(() => import("./pages/SignIn"));
const SignUp    = lazy(() => import("./pages/SignUp"));

export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div style={{padding:24}}>Loading…</div>}>
     <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home now points to Welcome */}
        <Route index element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/clientportal" element={<ClientPortal />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignUp />} />
        <Route path="/cashflow" element={<Cashflow />} />
        <Route path="/clientrequest" element={<ClientRequest />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
   </Suspense>
   </BrowserRouter>
  );
}

export default App;