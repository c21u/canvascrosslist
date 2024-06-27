import React from "react";
import Home from "./components/Home.js";
import Crosslist from "./components/Crosslist.js";
import { View } from "@instructure/ui-view";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/** App top-level component
 * @param {Props} props
 * @return {Component}
 */

const App = () => {
  return (
    <Router>
      <View as="div" margin="large">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crosslist" element={<Crosslist />} />
        </Routes>
      </View>
    </Router>
  );
};

export default App;
