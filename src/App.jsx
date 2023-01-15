import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from "./components/Home";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';


function App() {

  return (
    <>
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
    </div>
    </>
  );
}

export default App;
