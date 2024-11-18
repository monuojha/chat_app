import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/authSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {

    auth: persistedReducer,
    
  

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      
    }),
});

export const persistor = persistStore(store);
export default store;
