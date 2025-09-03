
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome"; 
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Forecast  = lazy(() => import("./pages/Forecast"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Reports   = lazy(() => import("./pages/Reports"));
const Settings  = lazy(() => import("./pages/Settings"));
// ... other pages

export default function App() {
  return (
    <Suspense fallback={<div style={{padding:24}}>Loading…</div>}>
     <Routes>
      <Route element={<Layout />}>
        {/* Home now points to Welcome */}
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
   </Suspense>
  );
}