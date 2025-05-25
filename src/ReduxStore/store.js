import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});