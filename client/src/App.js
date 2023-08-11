import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import logo from "./images/logo.png";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <p>Welcome to the AuctionApp! Happy bidding!</p>
      </header>
      <Footer />
    </div>
  );
}

export default App;
