import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App/App.tsx";

import { AuthProvider } from "./Context/AuthContext/context.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { NotificationProvider } from "./Context/NotificationContext/context.tsx";

import "react-toastify/dist/ReactToastify.css";

import "./Styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <NotificationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotificationProvider>
    </ChakraProvider>
  </React.StrictMode>
);
