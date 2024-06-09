import React from "react";
import { createRoot } from "react-dom/client";
import {App} from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import CroudfundingProvider from "./context/CroudfundingProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <CroudfundingProvider>
        <App />
      </CroudfundingProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
