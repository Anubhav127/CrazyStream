import React, { useEffect, useState } from 'react'
import logo from '../../assets/stream.png'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../Features/User/userSlice';
import { persistor } from '../App/store';

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

      const response = await axios.post("https://192.168.253.36:8000/users/login", data, {
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
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
  <div className='flex w-full max-w-md bg-slate-600 justify-center p-6'>
    <div>
      <img src={logo} alt="logo" className='w-28' />
    </div>
    <h1 className='text-3xl pt-7 px-4 text-white font-bold'>Crazy Stream</h1>
  </div>

  <div className='bg-white w-full max-w-md shadow-lg rounded-lg mt-4'>
    <form onSubmit={handleSubmit} className='flex flex-col items-center p-6'>
      <input
        type='email'
        placeholder='E-Mail'
        name='email'
        onChange={inputChange}
        value={data.email}
        className='m-2 w-full h-10 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-300'
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        onChange={inputChange}
        value={data.password}
        className='m-2 w-full h-10 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-300'
      />
      <input
        type='submit'
        value={"Login"}
        className='bg-sky-600 m-4 w-full py-2 rounded-md text-white font-semibold transition duration-200 hover:bg-orange-400 hover:text-lg'
      />
    </form>
  </div>
</div>

  )
}

export default Login;