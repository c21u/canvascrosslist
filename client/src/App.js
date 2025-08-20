import React, { useEffect, useState } from "react";
import Home from "./components/Home.js";
import Crosslist from "./components/Crosslist.js";
import { View } from "@instructure/ui-view";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import agent from "./agent.js";

/** App top-level component
 * @param {Props} props
 * @return {Component}
 */

const App = () => {
  const [currentView, setCurrentView] = useState("Home");
  useEffect(() => {
    agent.test.post().then((response) => {
      console.log(response);
    });
  });
  return (
    <View as="div" margin="large">
      {currentView == "Home" ? <Home setCurrentView={setCurrentView} /> : ""}
      {currentView == "Crosslist" ? (
        <Crosslist setCurrentView={setCurrentView} />
      ) : (
        ""
      )}
    </View>
    // <Home />
    // <Router>
    //   <View as="div" margin="large">
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/crosslist" element={<Crosslist />} />
    //     </Routes>
    //   </View>
    // </Router>
  );
};

export default App;
