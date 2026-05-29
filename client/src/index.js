import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@instructure/emotion";
import theme from "@instructure/canvas-theme";
import Loadable from "./components/Loadable";

// eslint-disable-next-line new-cap
const LoadableApp = Loadable({
  loader: () => import("./App"),
  modules: ["./App"],
  webpack: () => [require.resolveWeak("./App")],
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <LoadableApp />
  </ThemeProvider>,
  document.getElementById("lti_root")
);
