import { createSlice } from '@reduxjs/toolkit'
// Initial State.

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null
}

// Function to push data into the data layer

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state,action) => {
        state.origin = action.payload;
    },
    setDestination: (state,action) => {
        state.destination = action.payload;
    },
    setTravelTimeInformation: (state,action) => {
        state.travelTimeInformation = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions

// Selectors :: to get data from the data layer.

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;