import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { useParams, useNavigate } from 'react-router-dom';
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";

const StreamPage = () => {
  
  const navigate = useNavigate();
  const { isAuthenticated, username}  = useSelector((state) => state.user.user);
  const { streamId } = useParams();

  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [appId, setAppId] = useState(import.meta.env.VITE_AGORA_APP_ID);
  const [channel, setChannel] = useState(streamId);
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(`${Math.floor(Math.random() * 10000)}${username}`);
  console.log("UID:", uid);
  


  useJoin({appid: appId, channel: channel, token: token ? token : null, uid}, calling);

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();
  
  const toggleCalling = () => {
    setCalling(!calling);
    if(calling)
      navigate("/dashboard");
  }

  useEffect(() => {
    if(!isAuthenticated)
      navigate("/login");
    toggleCalling();
  }, [isAuthenticated]);

  console.log("Remote users:", remoteUsers);
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
    {/* Video Section */}
    <div className="flex-1 p-4 lg:w-2/3 lg:pr-6 p-4 y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Local User Video */}
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-md">
          <LocalUser
            audioTrack={localMicrophoneTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            videoTrack={localCameraTrack}
            key={streamId}
          >
            <span className="absolute top-0 p-2 text-sm font-bold">You</span>
          </LocalUser>
        </div>
        
      {/* Remote User Videos */}
      {remoteUsers.map((user) => (
        <div
          className="w-16 h-9 rounded-lg overflow-hidden bg-gray-800 shadow-md"
          key={user.uid}
        >
          <RemoteUser user={user} >
            <span className="absolute bottom-2 left-2 text-sm font-bold">{user.uid.slice(4)}</span>
          </RemoteUser>
        </div>
      ))}
    </div>
  </div>

  {/* Controls Section */}
<div className=" lg:fixed bottom-0 left-0 lg:w-full lg:pr-6 p-4 bg-gray-800 flex justify-between space-x-4">
<div className="flex space-x-4">
  <button
    className={`btn ${micOn ? "bg-green-500" : "bg-red-500"} p-2 rounded-lg flex items-center`}
    onClick={() => setMic((a) => !a)}
  >
    {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
  </button>
  <button
    className={`btn ${cameraOn ? "bg-green-500" : "bg-red-500"} p-2 rounded-lg flex items-center`}
    onClick={() => setCamera((a) => !a)}
  >
    {cameraOn ? <IoVideocam /> : <IoVideocamOff />}
  </button>
</div>
<button
  className={`btn ${calling ? "bg-red-500" : "bg-blue-500"} p-2 rounded-lg flex items-center`}
  onClick={toggleCalling}
>
  <MdCallEnd />
</button>
</div>
</div>

  );
}

export default StreamPage;