import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import CroudfundingProvider from "./context/CroudfundingProvider";
import "./index.css";

// for starting run npx thirdweb@latest create --app, it generates a thirdweb configured app

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThirdwebProvider>
      <CroudfundingProvider>
        <App />
      </CroudfundingProvider>
    </ThirdwebProvider>
  </BrowserRouter>
);
