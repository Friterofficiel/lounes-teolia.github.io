// src/components/HeaderComp.tsx
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logoPoudlard.png';

const HeaderComp: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToAbout = () => {
    navigate('lounes-teolia.github.io/about');
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('lounes-teolia.github.io/login');
  };

  return (
    <header className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(lounes-teolia.github.io/assets/fondHarry.png)' }}>
      <nav className={`fixed w-full top-0 left-0 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} z-10`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center">
            <img className='h-20' src={Logo} alt="Logo" />
            {user && (
              <img src={user?.photoURL || 'placeholder.jpg'} alt="Photo de profil" className=" h-16 w-16 rounded-full mr-4 border-2 border-yellow-600" />
            )}
          </div>
          <div className="hidden md:flex space-x-4 text-yellow-600 font-serif">
            <Link to="lounes-teolia.github.io/" className="hover:text-gray-700">Home</Link>
            <button onClick={scrollToAbout} className="hover:text-gray-700">About</button>
            <Link to="lounes-teolia.github.io/students" className="hover:text-gray-700">Students</Link>
            <Link to="lounes-teolia.github.io/dashboard" className="hover:text-gray-700">Dashboard</Link>
            {user ? (
              <>
                <Link to="/profile" className="hover:text-gray-700">Profile</Link> {/* Lien vers la page Profile */}
                <button onClick={handleLogout} className="hover:text-gray-700">Logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-700">Login</Link>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-yellow-100 shadow-md">
            <Link to="lounes-teolia.github.io/" className="block px-4 py-2 hover:bg-yellow-200">Home</Link>
            <button onClick={scrollToAbout} className="block w-full text-left px-4 py-2 hover:bg-yellow-200">About</button>
            <Link to="lounes-teolia.github.io/students" className="block px-4 py-2 hover:bg-yellow-200">Students</Link>
            <Link to="lounes-teolia.github.io/dashboard" className="block px-4 py-2 hover:bg-yellow-200">Dashboard</Link>
            {user ? (
              <>
                <Link to="lounes-teolia.github.io/profile" className="hover:text-gray-700">Profile</Link> {/* Lien vers la page Profile */}
                <button onClick={handleLogout} className="hover:text-gray-700">Logout</button>
              </>
            ) : (
              <Link to="lounes-teolia.github.io/login" className="hover:text-gray-700">Login</Link>
            )}
          </div>
        )}
      </nav>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl text-red-500 font-bold">Bienvenue à Poudlard</h1>
        <button
          onClick={scrollToAbout}
          className="mt-8 p-4 rounded-full bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          aria-label="Scroll to about section"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HeaderComp;
