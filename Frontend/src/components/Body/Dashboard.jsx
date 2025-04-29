import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearStreamUrl, setStreamUrl, clearAllStreamUrl } from '../Features/Stream/streamSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [channel, setChannel] = useState();
  const {isAuthenticated, username, refreshToken} = useSelector((state) => state.user.user);

  useEffect(() => {
    if(!isAuthenticated)
      navigate("/login")
  },[isAuthenticated])

  const createRoom = async () => {
    let roomId = await uuidv4().slice(0,8);
    setChannel(roomId);
    window.location.href = `/stream/${roomId}`;
   }

   const joinRoom = () => {
    if(!channel)
      alert("Please enter a valid Meeting ID");
    else
      window.location.href = `/stream/${channel}`;
   }

  return isAuthenticated && (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Welcome to Your Dashboard</h1>
        <p className="text-gray-300 text-lg">Start or join a streaming session</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Create Room Card */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Create New Room</h2>
          <p className="text-gray-400 mb-6">Start a new streaming session and invite others to join</p>
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2"
            onClick={createRoom}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Create Room</span>
          </button>
        </div>

        {/* Join Room Card */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Join Existing Room</h2>
          <p className="text-gray-400 mb-4">Enter a meeting ID to join an existing stream</p>
          <input
            type='text' 
            required 
            onChange={event => setChannel(event.target.value)} 
            value={channel} 
            placeholder='Enter Meeting ID'
            className='w-full mb-4 bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300'
          />
          <button
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            onClick={joinRoom}
            disabled={!channel}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span>Join Room</span>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Coming Soon</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300">
            <svg className="w-8 h-8 mx-auto mb-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <h3 className="text-lg font-semibold mb-2">Scheduled Meetings</h3>
            <p className="text-gray-400">Plan and organize your streams in advance</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300">
            <svg className="w-8 h-8 mx-auto mb-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <h3 className="text-lg font-semibold mb-2">Participant Management</h3>
            <p className="text-gray-400">Control and manage stream participants</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300">
            <svg className="w-8 h-8 mx-auto mb-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-400">Chat with participants during streams</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
