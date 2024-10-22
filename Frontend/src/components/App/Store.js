import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/User/userSlice.js';
import streamReducer from '../Features/Stream/streamSlice.js'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
    key: "user",
    storage,
    whitelist: ["user"]
}

const streamPersistConfig = {
    key: "stream",
    storage,
}

const streamPersistedReducer = persistReducer(streamPersistConfig, streamReducer);
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);


export const store = configureStore({
    reducer: {
        user: userPersistedReducer,
        stream: streamPersistedReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export const persistor = persistStore(store);