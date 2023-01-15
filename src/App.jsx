import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from "./Pages/ComponentHome/Home";
import Blog from "./Pages/ComponentBlog/Blog";
import Contact from "./Pages/ComponentContact/Contact";
import Login from "./Pages/ComponentLogin/Login";
import Signup from "./Pages/ComponentSignup/Signup";
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
