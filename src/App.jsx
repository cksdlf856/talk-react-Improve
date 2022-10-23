import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Chat from "./components/Chat/Chat";
import Oauth from "./components/Oauth/Oauth";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Oauth />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
