import { configureStore } from '@reduxjs/toolkit'
import navReducer from './slice/navSlice'
import authReducer from './slice/authSlice'

export const store = configureStore({
  reducer: {
    nav: navReducer,
    auth: authReducer,
  },
});