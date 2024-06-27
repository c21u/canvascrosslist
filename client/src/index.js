import React from "react";
import ReactDOM from "react-dom";
import { EmotionThemeProvider } from "@instructure/emotion";
import theme from "@instructure/canvas-theme";
import Loadable from "./components/Loadable";

// eslint-disable-next-line new-cap
const LoadableApp = Loadable({
  loader: () => import("./App"),
  modules: ["./App"],
  webpack: () => [require.resolveWeak("./App")],
});

ReactDOM.render(
  <EmotionThemeProvider theme={theme}>
    <LoadableApp />
  </EmotionThemeProvider>,
  document.getElementById("lti_root")
);
