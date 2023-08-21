import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import axios from "axios";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main className="content">
        <header className="App-header">
          <p>Welcome to the AuctionApp! Happy bidding!</p>
        </header>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
