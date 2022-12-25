import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => configureStore({
  reducer: {}
})

const store = makeStore();

export default store;