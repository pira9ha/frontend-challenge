import { configureStore } from '@reduxjs/toolkit';
import catsReducer from './catsSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    catsWorker: catsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
