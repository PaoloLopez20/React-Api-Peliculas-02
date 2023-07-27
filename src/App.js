import NavBar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Footer from "./Components/Footer";
// import Search from "./Components/Search";
// import React, { useState } from 'react';
import './App.css';
import Preloader from "./Components/Preloader";
// import MovieSearch from './Components/MovieSearch';
import React from 'react';



function App() {

  return (
    <div>
      <Preloader />
      <NavBar />
      <Movies />
      <Footer />
    </div>

  );
};

export default App;