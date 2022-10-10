import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Header from "./components/Header";
import Side from "./components/Side";


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
