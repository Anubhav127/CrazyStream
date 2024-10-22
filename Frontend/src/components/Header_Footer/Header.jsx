import React from 'react'
import img2 from '../../assets/stream.png'
import img from '../../assets/OIP.jpeg'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { persistor } from '../App/store.js'
import { clearUserData } from '../Features/User/userSlice'
import { clearAllStreamUrl } from '../Features/Stream/streamSlice'
import axios from 'axios'

const Navbar = () => {

  const { avatar, isAuthenticated, fullName, refreshToken, username } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [showLogout, setShowLogout] = useState(false);

  const handleFullNameClick = () => {
    setShowLogout(prev => !prev); // Toggle the visibility of the logout button
  };

  const onLogout = async () => {
    
    try {
      const info = await axios.delete('https://192.168.253.36:8000/stream/deleteAll', { data: { username },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        }
      })
      console.log("Cleared All Stream ", info);

      const response = await axios.get('https://192.168.253.36:8000/users/logout', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        }
      });
      console.log(response);
    } catch (error) {
      console.log("this is error ",error);
    }
    await persistor.flush();
    await persistor.purge();
    await localStorage.removeItem('persist:user');
    await localStorage.removeItem('persist:stream');
    dispatch(clearUserData());
    dispatch(clearAllStreamUrl());
    
  }

  return (
    <div>
      <div className='flex justify-between items-center bg-slate-500 p-4'>
        <div className='flex items-center space-x-5 ml-5'>
          <img src={img2} alt="logo" className='w-9 h-9 mix-blend-multiply' />
          <h1 className='text-xl font-bold text-white'>Crazy Stream</h1>
        </div>

        <div className='hidden md:flex items-center space-x-5'>
          <NavLink to="/" className='text-white hover:text-gray-200'>
            <button className='pt-2'>Home</button>
          </NavLink>
          <NavLink to="/dashboard" className='text-white hover:text-gray-200'>
            <button className='pt-2'>Dashboard</button>
          </NavLink>
          <NavLink to="/about" className='text-white hover:text-gray-200'>
            <button className='pt-2'>About</button>
          </NavLink>
        </div>

        <div className='flex items-center space-x-5 mr-5'>
          {/* Notification Bell Icon */}
          <button className='text-white hover:text-gray-200'>
            <i className='fas fa-bell'></i>
          </button>
  
          {isAuthenticated ? (
          <div className='flex flex-row items-center'>
            <img src={avatar} alt="Profile" className='w-9 h-9 rounded-full border-2 border-white' />
            <div className='flex items-center'>
            <h1 className='pt-1 pl-2 text-white font-semibold cursor-pointer' onClick={handleFullNameClick}>
              {fullName}
            </h1>
            {/* Sliding Logout Button */}
            <button 
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1 transition-transform transform ${showLogout ? "translate-y-0" : "-translate-y-5 opacity-0"}`}
              style={{ transition: 'transform 0.3s, opacity 0.3s' }}
              onClick={onLogout}
            >
              Logout
            </button>
            </div>
          </div>
        ) : (
          <img src={img} alt="Profile" className='w-9 h-9 rounded-full border-2 border-white' />
        )}
      </div>


        <button className='md:hidden text-white' onClick={toggleMenu}>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-slate-500 text-white p-4'>
          <NavLink to="/" className='block py-2 hover:text-gray-200' onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/dashboard" className='block py-2 hover:text-gray-200' onClick={toggleMenu}>Dashboard</NavLink>
          <NavLink to="/about" className='block py-2 hover:text-gray-200' onClick={toggleMenu}>About</NavLink>
        </div>
      )}
    </div>
  )
}

export default Navbar;