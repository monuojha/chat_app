    import { configureStore } from '@reduxjs/toolkit';


import authSlice from './features/authSlice'

import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'auth',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
});

export  const persistor = persistStore(store)
export default store;
