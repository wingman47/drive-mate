import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state, action) => {
      state.user = null;
    },
  },
});

export const {setLogin, setLogout} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;