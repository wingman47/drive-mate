import {configureStore} from '@reduxjs/toolkit';
import navReducer from './slice/navSlice';
import authReducer from './slice/authSlice';
import availableDriversReducer from './slice/availableDriversSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    auth: authReducer,
    availableDrivers: availableDriversReducer,
  },
});