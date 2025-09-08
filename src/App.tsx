import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./react-router.config";

export default function App() {
  const element = useRoutes(routes);

  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        {element}
      </Suspense>
    </BrowserRouter>
  );
}
