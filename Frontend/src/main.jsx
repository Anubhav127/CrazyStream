import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {persistor, store} from './components/App/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <AgoraRTCProvider client={client}>
          <App />
        </AgoraRTCProvider>  
      </PersistGate>
    </Provider>
  </StrictMode>,
)
