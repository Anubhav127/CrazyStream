import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex flex-col'>
  <div className='flex-grow'>
  </div>

  <div className='bg-gray-800 text-white py-5'>
    <div className='container mx-auto flex flex-col md:flex-row justify-between px-5'>

      <div className='mb-4 md:mb-0'>
        <p className='text-center md:text-left'>
          © 2024 Crazy Stream. All rights reserved.
        </p>
      </div>

      {/* Navigation Links */}
      <div className='flex space-x-4 mb-4 md:mb-0'>
        <NavLink to="/about" className='hover:text-gray-400'>
          About Us
        </NavLink>
        <NavLink to="/privacy" className='hover:text-gray-400'>
          Privacy Policy
        </NavLink>
        <NavLink to="/terms" className='hover:text-gray-400'>
          Terms of Service
        </NavLink>
      </div>

      {/* Social Media Links */}
      <div className='flex space-x-4'>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='hover:text-gray-400'>
          <i className='fab fa-facebook-f'></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='hover:text-gray-400'>
          <i className='fab fa-twitter'></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='hover:text-gray-400'>
          <i className='fab fa-instagram'></i>
        </a>
      </div>
    </div>
  </div>
</div>

  );
}

export default Footer