import React, { useState } from "react";
import Home from "./components/Home.js";
import Crosslist from "./components/Crosslist.js";
import { View } from "@instructure/ui-view";

/** App top-level component
 * @param {Props} props
 * @return {Component}
 */

const App = () => {
  const [currentView, setCurrentView] = useState("Home");
  return (
    <View as="div" margin="large">
      {currentView == "Home" ? <Home setCurrentView={setCurrentView} /> : ""}
      {currentView == "Crosslist" ? (
        <Crosslist setCurrentView={setCurrentView} />
      ) : (
        ""
      )}
    </View>
  );
};

export default App;
