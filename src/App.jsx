import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { LoginPage } from './pages/login';
import { ApplicationsPage } from './pages/applications';
import { RouteProtector } from './components/RouteProtector/RouteProtector';
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import Contact from './pages/contact/Contact';
import SignupPage from './pages/signup/SignupPage';
import NavBar from './components/NavBarComponent/NavBar';
import './App.css';
import { ApplicationViewContainer } from './components/ApplicationViewContainer/ApplicationViewContainer';
import { ChangePasswordForm } from './components/LoginComponent/ChangePasswordForm/ChangePasswordForm';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/login" element={<LoginPage isAdmin={true} />} />
        <Route
          path="/admin/applications"
          element={
            <RouteProtector
              admin={true}
              redirectionComponent={<LoginPage isAdmin={true} />}
            >
              <ApplicationsPage />
            </RouteProtector>
          }
        />
        <Route
          path="/admin/applications/view/:id"
          element={
            <RouteProtector
              admin={true}
              redirectionComponent={<LoginPage isAdmin={true} />}
            >
              <ApplicationViewContainer />
            </RouteProtector>
          }
        />
        <Route
          path="/user/applications/view/:id"
          element={
            <RouteProtector
              requiresAuth={true}
              redirectionComponent={<LoginPage isAdmin={false} />}
            >
              <ApplicationViewContainer />
            </RouteProtector>
          }
        />
        <Route
          path="/user/applications"
          element={
            <RouteProtector
              requiresAuth={true}
              redirectionComponent={<LoginPage />}
            >
              <ApplicationsPage />
            </RouteProtector>
          }
        />
        <Route
          path="/password-reset/request"
          element={<LoginPage passwordResetMode={true} />}
        />
        <Route
          path="/password-reset/recover"
          element={<ChangePasswordForm />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
