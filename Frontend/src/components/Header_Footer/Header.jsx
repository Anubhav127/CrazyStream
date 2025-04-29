import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { persistor } from '../App/store';
import { clearUserData } from '../Features/User/userSlice';
import { clearAllStreamUrl } from '../Features/Stream/streamSlice';
import axios from 'axios';
import img2 from '../../assets/stream.png';


const Header = () => {
  const { avatar, isAuthenticated, fullName, refreshToken, username } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock notifications - replace with real data
  const notifications = [
    { id: 1, text: 'New stream started', isNew: true },
    { id: 2, text: 'Profile updated successfully', isNew: false },
    { id: 3, text: 'Welcome to Crazy Stream!', isNew: false },
  ];

  const onLogout = async () => {
    try {
      // await axios.delete('http://localhost:8000/stream/deleteAll', {
      //   data: { username },
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${refreshToken}`,
      //   }
      // });

      await axios.get('https://virtualhosting.onrender.com/users/logout', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        }
      });

      await persistor.flush();
      await persistor.purge();
      await localStorage.removeItem('persist:user');
      await localStorage.removeItem('persist:stream');
      dispatch(clearUserData());
      dispatch(clearAllStreamUrl());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu') && !event.target.closest('.notification-menu')) {
        setShowLogout(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <img src={img2} alt="logo" className="w-10 h-10" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Crazy Stream
              </span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) =>
              `text-gray-300 hover:text-white transition-colors duration-200 ${isActive ? 'text-white font-semibold' : ''}`
            }>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) =>
              `text-gray-300 hover:text-white transition-colors duration-200 ${isActive ? 'text-white font-semibold' : ''}`
            }>
              Dashboard
            </NavLink>
            <NavLink to="/about" className={({ isActive }) =>
              `text-gray-300 hover:text-white transition-colors duration-200 ${isActive ? 'text-white font-semibold' : ''}`
            }>
              About
            </NavLink>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative notification-menu">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-300 hover:text-white relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                  setShowLogout(false);
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.some(n => n.isNew) && (
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
                  >
                    {notifications.map(notification => (
                      <div key={notification.id} className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                        <span className="text-gray-300 text-sm flex-grow">{notification.text}</span>
                        {notification.isNew && (
                          <span className="bg-blue-500 text-xs text-white px-2 py-1 rounded-full">New</span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            {isAuthenticated ? (
              <div className="relative profile-menu">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLogout(!showLogout);
                    setShowNotifications(false);
                  }}
                >
                  <img src={avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-500" />
                  <span className="text-gray-300 hover:text-white">{fullName}</span>
                </motion.div>

                <AnimatePresence>
                  {showLogout && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
                    >
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <img src={"https://static.vecteezy.com/system/resources/thumbnails/005/544/708/small_2x/profile-icon-design-free-vector.jpg"} alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-500" />
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive
                    ? 'text-white bg-gray-900'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive
                    ? 'text-white bg-gray-900'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive
                    ? 'text-white bg-gray-900'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                }
              >
                About
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Header;
