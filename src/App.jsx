import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from "./Pages/Home/Home";
import Blog from "./Pages/Blog/Blog";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
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
