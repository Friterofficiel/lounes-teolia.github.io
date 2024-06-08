import React from 'react';
import HeaderComp from './components/HeaderComp';
import AboutComp from './components/AboutComp';
import StudentsComp from './components/StudentsComp';

const App: React.FC = () => {
  return (
    <div>
      <HeaderComp />
      <AboutComp />
      <StudentsComp />
    </div>
  );
};

export default App;
