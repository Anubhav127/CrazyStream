import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../App/Store';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../Features/User/userSlice';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.user.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!isAuthenticated)
      navigate("/login")
  },[isAuthenticated])

  const purge = () => {
    dispatch(clearUserData());
    persistor.purge();
    navigate("/login");
  }

  let roomUrl;
  const createRoom = () => {
    roomUrl = `/stream/${uuidv4().slice(0,8)}?publish=true`;
    window.location.href = roomUrl;
  }

  return isAuthenticated && (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-4xl mb-6">Welcome to Your Dashboard</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={createRoom}
      >
        Create a Meeting
      </button>

      
      <div className="mt-5">
        <p className="text-green-600">Meeting Link:</p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Join Meeting
        </button>
        {roomUrl}
      </div>

      <div className="mt-5">
        <p className="text-green-600">Purge Button:</p>
        <button onClick={purge}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Purge Button
        </button>
      </div>
      

      <div className="mt-10">
        {/* Additional Features */}
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
