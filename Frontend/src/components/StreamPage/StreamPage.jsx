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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-6">
        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {/* Local User Video */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-800 shadow-xl ring-1 ring-gray-700 transform transition-transform duration-300 hover:scale-[1.02]">
            <LocalUser
              audioTrack={localMicrophoneTrack}
              cameraOn={cameraOn}
              micOn={micOn}
              videoTrack={localCameraTrack}
              key={streamId}
            >
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium bg-blue-500/20 px-3 py-1 rounded-full">You</span>
                  {!micOn && <FaMicrophoneSlash className="text-red-500" />}
                  {!cameraOn && <IoVideocamOff className="text-red-500" />}
                </div>
              </div>
            </LocalUser>
          </div>
          
          {/* Remote User Videos */}
          {remoteUsers.map((user) => (
            <div
              className="relative aspect-video rounded-2xl overflow-hidden bg-gray-800 shadow-xl ring-1 ring-gray-700 transform transition-transform duration-300 hover:scale-[1.02]"
              key={user.uid}
            >
              <RemoteUser user={user}>
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
                  <span className="text-sm font-medium bg-purple-500/20 px-3 py-1 rounded-full">
                    {user.uid.slice(4)}
                  </span>
                </div>
              </RemoteUser>
            </div>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8">
            {/* Mic Control */}
            <button
              className={`group relative p-4 rounded-full transition-all duration-300 ${
                micOn ? 'bg-green-500/10 hover:bg-green-500/20' : 'bg-red-500/10 hover:bg-red-500/20'
              }`}
              onClick={() => setMic((a) => !a)}
            >
              {micOn ? (
                <FaMicrophone className="w-6 h-6 text-green-500" />
              ) : (
                <FaMicrophoneSlash className="w-6 h-6 text-red-500" />
              )}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {micOn ? 'Mute' : 'Unmute'}
              </span>
            </button>

            {/* Camera Control */}
            <button
              className={`group relative p-4 rounded-full transition-all duration-300 ${
                cameraOn ? 'bg-green-500/10 hover:bg-green-500/20' : 'bg-red-500/10 hover:bg-red-500/20'
              }`}
              onClick={() => setCamera((a) => !a)}
            >
              {cameraOn ? (
                <IoVideocam className="w-6 h-6 text-green-500" />
              ) : (
                <IoVideocamOff className="w-6 h-6 text-red-500" />
              )}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {cameraOn ? 'Stop Video' : 'Start Video'}
              </span>
            </button>

            {/* End Call */}
            <button
              className="group relative p-4 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-all duration-300"
              onClick={toggleCalling}
            >
              <MdCallEnd className="w-6 h-6 text-red-500" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                End Call
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default StreamPage;
