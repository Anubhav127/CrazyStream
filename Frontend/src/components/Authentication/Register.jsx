import React, { useState } from 'react'
import logo from '../../assets/stream.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setData({ 
      ...data,
      [name]: value
     })
  }

  const inputChangeImage = (e) => { 
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('avatar', image);
      console.log(formData);
      
      const response = await axios.post('https://virtualhosting.onrender.com/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      if(response.status === 201){
        alert('User registered successfully');
      }
      navigate('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setData({
        email: "",
        password: "",
        username: "",
        fullName: ""
      })
    }
    }

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
      <div className='w-full mb-2'>
        <label htmlFor="username" className='block text-left'>Username:</label>
        <input
          type='text'
          name='username'
          placeholder='Enter Username'
          value={data.username}
          onChange={inputChange}
          className='mt-1 w-full h-10 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-300'
        />
      </div>
      
      <div className='w-full mb-2'>
        <label htmlFor="fullName" className='block text-left'>Full Name:</label>
        <input
          type="text"
          name="fullName"
          placeholder='Enter Full Name'
          value={data.fullName}
          onChange={inputChange}
          className='mt-1 w-full h-10 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-300'
        />
      </div>
      
      <div className='w-full mb-2'>
        <label htmlFor="email" className='block text-left'>E-Mail:</label>
        <input
          type='email'
          name='email'
          placeholder='E-Mail'
          value={data.email}
          onChange={inputChange}
          className='mt-1 w-full h-10 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-300'
        />
      </div>
      
      <div className='w-full mb-2'>
        <label htmlFor="password" className='block text-left'>Password:</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={data.password}
          onChange={inputChange}
          className='mt-1 w-full h-10 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-300'
        />
      </div>
      
      <div className='w-full mb-4'>
        <label htmlFor="avatar" className='block text-left'>Profile Pic:</label>
        <input
          type='file'
          name='avatar'
          onChange={inputChangeImage}
          className='mt-1 border border-gray-300 rounded-md w-full p-2'
        />
      </div>
      
      <input
        type='submit'
        value='Register'
        className='bg-sky-600 m-4 w-full py-2 rounded-md text-white font-semibold transition duration-200 hover:bg-orange-400'
      />
    </form>
  </div>
</div>

  )
}

export default Register;
