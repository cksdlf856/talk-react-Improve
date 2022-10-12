import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Header from "./components/Header/Header";
import Side from "./components/Side/Side";


function App() {
  return (
    <HashRouter>
      <Header />
      <Side />
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
