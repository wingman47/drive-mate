import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  sameDestination: [],
  sameCategory: [],
  radius: [],
};

export const availableDriversSlice = createSlice({
  name: 'availableDrivers',
  initialState,
  reducers: {
    setSameDestination: (state, action) => {
      state.sameDestination = action.payload;
    },
    setSameCategory: (state, action) => {
      state.sameCategory = action.payload;
    },
    setRadius: (state, action) => {
      state.radius = state.radius.concat(action.payload);
    },
  },
});

export const {setSameDestination, setSameCategory, setRadius} =
  availableDriversSlice.actions;

// Selectors
export const selectSameDestination = state => state.availableDrivers.sameDestination;
export const selectCategory = state => state.availableDrivers.sameCategory;
export const selectRadius = state => state.availableDrivers.radius;

export default availableDriversSlice.reducer;
