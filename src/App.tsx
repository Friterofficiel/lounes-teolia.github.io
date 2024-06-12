// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/home';
import LoginPage from './pages/Login/login';
import RegisterPage from './pages/Register/register';
import DashboardPage from './pages/Dashboard/dashboard';
import StudentsPage from './pages/Students/students';
import ProfilPage from './pages/Profile/profile';
import AboutPage from './pages/About/about';
import PrivateRoute from './components/PrivateRoute';



const App: React.FC = () => {
  return (
    <Router>
      <HomePage />
      <Routes>
        <Route path="/lounes-teolia.github.io/login" element={<LoginPage />} />
        <Route path="/lounes-teolia.github.io/register" element={<RegisterPage />} />
        <Route path="/lounes-teolia.github.io/about" element={<AboutPage />} />
        <Route path="/lounes-teolia.github.io/profile" element={<ProfilPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/lounes-teolia.github.io/students" element={<StudentsPage />} />
          <Route path="/lounes-teolia.github.io/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<div></div>} />
      </Routes>
    </Router>
  );
};

export default App;
