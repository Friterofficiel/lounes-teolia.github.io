// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComp from './components/HeaderComp';
import StudentsComp from './components/StudentsComp';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import AboutComp from './components/AboutComp';
import ProfilePage from './components/ProfilePage';


const App: React.FC = () => {
  return (
    <Router>
      <HeaderComp />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutComp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/students" element={<StudentsComp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
