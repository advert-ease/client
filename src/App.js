import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./Login";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:cust" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
