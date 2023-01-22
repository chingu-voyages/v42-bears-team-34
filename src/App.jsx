import './App.css'
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";

import Signup from "./pages/signup/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LoginPage } from './pages/login';
import NavBar from './components/NavBarComponent/NavBar'

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
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
