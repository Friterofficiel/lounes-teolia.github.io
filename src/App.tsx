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
import GameHogwarts from './components/GameHogwarts';


const App: React.FC = () => {
  return (
    <Router>
      <HeaderComp />
      <Routes>
        <Route path="/lounes-teolia.github.io/login" element={<Login />} />
        <Route path="/lounes-teolia.github.io/register" element={<Register />} />
        <Route path="/lounes-teolia.github.io/about" element={<AboutComp />} />
        <Route path="/lounes-teolia.github.io/games" element={<GameHogwarts />} />
        <Route path="/lounes-teolia.github.io/profile" element={<ProfilePage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/lounes-teolia.github.io/students" element={<StudentsComp />} />
          <Route path="/lounes-teolia.github.io/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<div></div>} />
      </Routes>
    </Router>
  );
};

export default App;
