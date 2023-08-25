import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Registration from "./pages/register";
import PasswordRecovery from "./pages/password-recovery"
import TermsAndConditions from "./pages/terms-and-conditions";
import PrivacyAndPolicy from "./pages/privacy-and-policy";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-and-policy" element={<PrivacyAndPolicy />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
