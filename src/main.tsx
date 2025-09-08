import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in HTML");
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
