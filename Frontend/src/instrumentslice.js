// instrumentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  instrumentToken: null,
};

const instrumentSlice = createSlice({
  name: 'instrument',
  initialState,
  reducers: {
    setInstrumentToken: (state, action) => {
      state.instrumentToken = action.payload;
    },
  },
});

export const { setInstrumentToken } = instrumentSlice.actions;
export default instrumentSlice.reducer;
