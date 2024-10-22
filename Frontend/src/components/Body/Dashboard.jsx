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
  <div className="flex flex-col items-center p-10">
    <h1 className="text-4xl mb-6">Welcome to Your Dashboard</h1>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={createRoom}
    >
      Create Room
    </button>

    <div className='flex flex-col items-center p-10'>
      <input
        type='text' 
        required 
        onChange={event => setChannel(event.target.value)} 
        value={channel} 
        placeholder='Meeting ID'
        className='m-2 w-full h-10 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-300'
      />
      <button
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        onClick={joinRoom}
      >
        Join Room
      </button>
    </div>

    <div className="mt-10">
      <h2 className="text-2xl mb-4">Upcoming Features:</h2>
      <ul className="list-disc list-inside">
        <li>View Scheduled Meetings</li>
        <li>Manage Participants</li>
        <li>Chat During Meetings</li>
      </ul>
    </div>
  </div>
  );
};

export default Dashboard;
