import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import logo from '../../assets/stream.png';

const Register = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state) => state.user.user);
  
  const [data, setData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });
  
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.username.trim()) newErrors.username = 'Username is required';
    if (!data.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!data.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Email is invalid';
    if (!data.password) newErrors.password = 'Password is required';
    else if (data.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setData({ 
      ...data,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if(isAuthenticated) {      
      navigate('/dashboard');
    }
    else      
      navigate('/register');
  },[isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (image) formData.append('avatar', image);
      
      const response = await axios.post('https://virtualhosting.onrender.com/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.message || 'Registration failed. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4 mb-8"
      >
        <img src={logo} alt="logo" className="w-16 h-16" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Crazy Stream
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 shadow-xl rounded-lg px-8 py-8">
          <h2 className="text-2xl font-bold text-center text-white mb-8">Create your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Preview */}
            <div className="flex justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center"
              >
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">👤</span>
                )}
                <input
                  type="file"
                  name="avatar"
                  onChange={inputChangeImage}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </motion.div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={inputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${errors.username ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={data.fullName}
                  onChange={inputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={inputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={inputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${errors.password ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 rounded-lg bg-red-500 bg-opacity-10 border border-red-500">
                <p className="text-sm text-red-500">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-600'} transition-all duration-200 flex items-center justify-center`}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Create Account'}
            </motion.button>

            {/* Login Link */}
            <p className="text-center text-gray-400 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
