import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Side from "./components/Side/Side";
import Oauth from "./components/Oauth/Oauth";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Oauth />} />
        <Route path="/side" element={<Side />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
