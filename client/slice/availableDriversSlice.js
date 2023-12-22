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
      state.sameDestination = state.sameDestination.concat(action.payload);
    },
    setSameCategory: (state, action) => {
      state.sameCategory = state.sameCategory.concat(action.payload);
    },
    setRadius: (state, action) => {
      state.radius = state.radius.concat(action.payload);
    },
  },
});

export const {setSameDestination, setSameCategory, setRadius} =
  availableDriversSlice.actions;

// Selectors
export const selectSameDestination = state =>
  state.availableDriversSlice.sameDestination;
export const selectCategory = state => state.availableDriversSlice.sameCategory;
export const selectRadius = state => state.availableDriversSlice.radius;

export default availableDriversSlice.reducer;
