import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/login';

import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import Signup from "./pages/signup/Signup";
import NavBar from './components/NavBarComponent/NavBar'
import './App.css'
import { AdminApplicationsPage } from './pages/admin';
import { RouteProtector } from './components/RouteProtector/RouteProtector';
import { UserPage } from './pages/user';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<LoginPage isAdmin={true} />} />
        <Route 
          path="/admin/applications" 
          element={
            <RouteProtector admin={true} redirectionComponent={<LoginPage isAdmin={true} />}>
              <AdminApplicationsPage />
            </RouteProtector>
          } 
        />
        <Route 
          path="/user/applications" 
          element={
          <RouteProtector requiresAuth={true} redirectionComponent={ <LoginPage />} >
              <UserPage />
            </RouteProtector>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
