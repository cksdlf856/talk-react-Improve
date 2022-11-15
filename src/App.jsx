import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// import Header from "./components/Header/Header";
import Main from "./components/Main/Main"
import Oauth from "./components/Oauth/Oauth";

function App() {
  return (
    <HashRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Oauth />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
