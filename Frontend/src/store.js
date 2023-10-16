// store.js
import { configureStore } from '@reduxjs/toolkit';
import instrumentReducer from './instrumentslice';

const store = configureStore({
  reducer: {
    instrument: instrumentReducer,
  },
});

export default store;
