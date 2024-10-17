import React from 'react'
import img2 from '../../assets/stream.png'
import img from '../../assets/OIP.jpeg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const { avatar, isAuthenticated, fullName } = useSelector((state) => state.user.user);

  return (
    <div>
        <div className='flex justify-between bg-slate-500 pb-2'>
        <div className='space-x-5 flex flex-row ml-5'>
          <img src={img2} alt="logo" className='w-9 h-9 mix-blend-multiply'/>
          <h1 className='pt-1 text-xl font-bold'>Crazy Stream</h1>
          <NavLink to="/" ><button className='pt-2'>Home</button></NavLink>
          <NavLink to="/dashboard"><button className='pt-2' >Dashboard</button></NavLink>
          <NavLink to="/about"><button className='pt-2' >About</button></NavLink>
        </div>
        <div className='flex flex-row space-x-5 mr-5'>
          <button>Bell</button>
          { isAuthenticated ? (<div className='flex'>
            <img src={avatar} alt="pp" className='w-9 h-9 rounded-full'/> <h1 className='pt-2 pl-3'>{fullName}</h1>
            </div>) : <img src={img} alt="pp" className='w-9 h-9 rounded-full'/>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar;