import { InitialState } from '../models/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatResponse } from '../models/CatResponse';

const initialState: InitialState = {
  load: false,
  cats: [],
  favorites: [],
  errorMessage: undefined,
};

export const catsSlice = createSlice({
  name: 'catsWorker',
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<CatResponse[]>) => {
      state.cats = action.payload;
    },
  },
});

export const { getAll } = catsSlice.actions;
export default catsSlice.reducer;
