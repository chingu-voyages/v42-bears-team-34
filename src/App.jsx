import './App.css'
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";

import Signup from "./pages/signup/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LoginPage } from './pages/login';
import Logo from "./assets/logo.jpg";

function App() {
  return (
    <>
      <div className="App">
        <nav className="nav-bar">
          <ul>
            <img src={Logo} alt="logo" />
            <li><Link to="/" className="links">HOME</Link></li>
            <li><Link to="blog" className="links">BLOG</Link></li>
            <li><Link to="contact" className="links">CONTACT</Link></li>
            <li><Link to="login" className="links">LOGIN</Link></li>
            <li><Link to="signup" className="links">SIGN UP</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
