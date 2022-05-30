import { InitialState } from '../constants/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatResponse } from '../models/CatResponse';

const initialState: InitialState = {
  load: false,
  cats: [],
  favorites: [],
  errorMessage: undefined,
};

export const CatsReducer = createSlice({
  name: 'catsWorker',
  initialState: initialState,
  reducers: {
    getAll: (state, action: PayloadAction<CatResponse[]>) => {
      state.cats = action.payload;
    }
  }
});
