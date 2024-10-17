import React, { useState } from 'react'
import logo from '../../assets/stream.png'
import axios from 'axios'

const Register = () => {

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
      
      const response = await axios.post('https://inherent-alvira-student312-f97034bb.koyeb.app/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      
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
    <div className='flex flex-col items-center '>
      <div className='flex w-1/2 bg-slate-600 justify-center p-12 py-3'>
        <div><img src={logo} alt="logo" className='w-28'/></div>
        <h1 className='text-4xl pt-7 px-14 text-white'>Crazy Stream</h1>
      </div>
      <div className='bg-gray-200 w-1/2 '>
        <form onSubmit={handleSubmit} className='flex flex-col items-center p-5'>
          <div className='w-1/2'><label htmlFor="username">Username:</label></div>
          <input type='text' name='username' placeholder='Enter Username' value={data.username} onChange={inputChange} className='m-2 w-1/2 h-8 outline outline-2 outline-gray-500 rounded-md'/>
          <input type="text" name="fullName" placeholder='Enter Full Name' value={data.fullName} onChange={inputChange} className='m-2 w-1/2 h-8 outline outline-2 outline-gray-500 rounded-md' />
          <input type='email' name='email' placeholder='E-Mail' value={data.email} onChange={inputChange} className='m-2 w-1/2 h-8 outline outline-2 outline-gray-500 rounded-md'/>
          <input type='password' name='password' placeholder='Password' value={data.password} onChange={inputChange} className='m-2 w-1/2 h-8 outline outline-2 outline-gray-500 rounded-md'/>
          <input type='file' name='avatar' onChange={inputChangeImage}/>
          <input type='submit' className='bg-sky-600 m-4 p-2 rounded-md outline outline-cyan-500 hover:text-lg hover:bg-orange-400 text-white ' />
        </form>
      </div>
      
    </div>
  )
}

export default Register;
