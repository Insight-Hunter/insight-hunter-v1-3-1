import { useState } from "react";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";

export default function Intro() {
  const [showDemo, setShowDemo] = useState(false);

  if (!showDemo) {
    return <Welcome onContinue={() => setShowDemo(true)} />;
  }
  return <Dashboard />;
}
