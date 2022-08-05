
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import fileReducer from '../reducer/reducer';


export default configureStore({
  reducer: {fileReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})
 

// export default store;