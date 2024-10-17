import React from 'react'
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Client, LocalStream }  from 'ion-sdk-js';
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../App/Store';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../Features/User/userSlice';

const StreamPage = () => {
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
  
    const pubVideo = useRef();
    const subVideo = useRef();

    const {streamId} = useParams();

    let isPub, client, signal;

  const config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  //http://localhost:5000/?publish=true
  const URL = new URLSearchParams(window.location.search).get("publish");
  console.log("url", URL);
  if(URL)
      isPub = true;
  else
      isPub = false;

  function connectWebSocket() {
    let attempts = 0;
  
    function tryConnect() {
      attempts++;
      signal = new IonSFUJSONRPCSignal("http://192.168.253.36:7000/ws");
      client = new Client(signal, config);
      
      signal.onopen = () => {
        console.log("WebSocket connected");
        client.join(streamId);
        console.log("Client joined", streamId);
        
      };
  
      signal.onerror = (error) => {
        console.error("WebSocket error:", error);
        if (attempts < 5) {
          setTimeout(tryConnect, Math.min(1000 * attempts, 5000));
        }
      };
    }
  
    tryConnect();
  }

  useEffect(() => {
    connectWebSocket();

    if(!isPub) {
      client.ontrack = (track, stream) => {
        console.log("got track: ", track, "for stream: ", stream);

        subVideo.current.srcObject = stream;
        subVideo.current.muted = false;
        subVideo.current.play();
        subVideo.current.controls = true;

        // Handle track mute and removetrack events
        track.onunmute = () => {
          
        };

        stream.onremovetrack = () => {
          subVideo.current.srcObject = null;
        }
      }
    }
    return () => {
      // Cleanup to ensure no duplicate transport or connections
      client.close();
    };
  }, []);

  const start = async (event) => {
    if(event)
    {
      await LocalStream.getUserMedia({
        resolution: 'hd',
        audio: true,
        codec: 'vp8'
      }).then((media) => {       
        pubVideo.current.srcObject = media;
        pubVideo.current.muted = false;
        pubVideo.current.play();
        pubVideo.current.controls = true;
        client.publish(media);
      }).catch((error) => console.log("this is error",error))
      }
      else
      {
        await LocalStream.getDisplayMedia({
          resolution: 'hd',
          audio: true,
          codec: 'vp8'
        }).then((media) => {
          pubVideo.current.srcObject = media;
          pubVideo.current.muted = false;
          pubVideo.current.play();
          pubVideo.current.controls = true;
          client.publish(media);
        }).catch(error => console.log(error))
      }
    }

    return (
        <div className='flex flex-col h-screen relative'>
        <header className='flex h-16 justify-center items-center text-xl bg-black text-white'>
          <div>ION_SFU</div>
          { isPub ? (
            <div className='absolute top-2 right-5'>
              <button id='bnt_pubcam' className='bg-blue-500 px-4 py-2 text-white rounded-lg mr-5' onClick={() => {start(true)}}>Publish Cam</button>
              <button id='bnt_pubscreen' className='bg-green-500 px-4 py-2 text-white rounded-lg mr-5' onClick={() => {start(false)}}>Publish Screen</button>
            </div>
          ) : null }
        </header>
        { isPub ? (
          <video id='pubVideo' className='bg-black' controls ref={pubVideo}></video>
        ) :
        <video id='subVideo' className='bg-black' controls ref={subVideo}></video>
      }
      </div>
    )
}

export default StreamPage