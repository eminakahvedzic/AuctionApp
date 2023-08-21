import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Registration from "./pages/register";
import PasswordRecovery from "./pages/password-recovery"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
