import React from 'react';
import HeaderComp from './components/HeaderComp';
import AboutComp from './components/AboutComp';
import StudentsComp from './components/StudentsComp';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div>
      <HeaderComp />
      <AboutComp />
      <StudentsComp />
      <Dashboard />
    </div>
  );
};

export default App;
