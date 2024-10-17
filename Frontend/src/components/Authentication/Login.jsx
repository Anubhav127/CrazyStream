import React, { useEffect, useState } from 'react'
import logo from '../../assets/stream.png'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../Features/User/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state) => state.user.user);

  const handleLoginSuccess = (data) => {
    
    const { user, accessToken, refreshToken } = data;

    const userData = {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      accessToken,
      refreshToken
    }

    dispatch(setUserData(userData));

  }

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const inputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

      const response = await axios.post("http://localhost:3000/users/login", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      
      
      if(response.status === 200) {
        handleLoginSuccess(response.data.data);
      }
      else
        console.log(response);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(isAuthenticated) {      
      navigate('/dashboard');
    }
    else      
      navigate('/login');
  },[isAuthenticated])

  return (
    <div className='flex flex-col items-center '>
      <div className='flex w-1/2 bg-slate-600 justify-center p-12 py-3'>
        <div><img src={logo} alt="logo" className='w-28'/></div>
        <h1 className='text-4xl pt-7 px-14 text-white'>Crazy Stream</h1>
      </div>
      <div className='bg-gray-200 w-1/2 '>
        <form onSubmit={handleSubmit} className='flex flex-col items-center p-5'>
          <input type='email' placeholder='E-Mail' name='email' onChange={inputChange} value={data.email} className='m-2 w-1/2 h-8 outline outline-2 outline-gray-500 rounded-md'/>
          <input type='password' placeholder='Password' name='password' onChange={inputChange} value={data.password} className='m-2 w-1/2 h-8 outline outline-2 outline-gray-500 rounded-md'/>
          <input type='submit' value={"Login"} className='bg-sky-600 m-4 p-2 rounded-md outline outline-cyan-500 hover:text-lg hover:bg-orange-400 text-white ' />
        </form>
      </div>
      
    </div>
  )
}

export default Login;