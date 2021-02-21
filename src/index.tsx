import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./store/Auth";
import { ChannelsProvider } from "./store/Channels/context";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ChannelsProvider>
        <App />
      </ChannelsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
