import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "./react-router.config";

export default function Root() {
  const routingElement = useRoutes(routes);

  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        {routingElement}
      </Suspense>
    </BrowserRouter>
  );
}
