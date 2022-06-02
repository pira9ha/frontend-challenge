import { CatsPinterestState } from '../models/catsPinterestState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesCatsResponse } from '../models/CatResponse';
import { deleteFavoriteCat, getAllCats, getAllFavoritesCats } from './redux.thunk';
import { ERROR_MESSAGE } from '../constants/service';

const initialState: CatsPinterestState = {
  loading: false,
  currentPage: 1,
  pagesCount: 0,
  favoritesPagesCount: 0,
  currentFavoritesPage: 0,
  cats: [],
  favorites: [],
  errorMessage: undefined,
};

export const catsSlice = createSlice({
  name: 'catsWorker',
  initialState,
  reducers: {
    setCurrentPageWithAllCats: (state) => {
      state.currentPage += 1;
    },
    setCurrentPageWithFavoritesCats: (state) => {
      state.currentFavoritesPage += 1;
    },
    setFavoritesCatsPageCount: (state, action: PayloadAction<number>) => {
      state.favoritesPagesCount = action.payload + 1;
    },
    setErrorMessage: (state) => {
      state.errorMessage = ERROR_MESSAGE;
    },
    saveAsFavorite: (state, action: PayloadAction<FavoritesCatsResponse>) => {
      state.favorites.push(action.payload);
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCats.pending, (state) => {
        state.loading = true;
        state.errorMessage = undefined;
      })
      .addCase(getAllCats.fulfilled, (state, action) => {
        state.loading = false;
        const result = action.payload?.data;
        state.pagesCount = action.payload ? +action.payload.pageCount + 1 : -1;
        state.cats = [...state.cats, ...result];
      })
      .addCase(getAllCats.rejected, (state) => {
        state.loading = false;
        state.errorMessage = ERROR_MESSAGE;
      });
    builder
      .addCase(getAllFavoritesCats.pending, (state) => {
        state.loading = true;
        state.errorMessage = undefined;
      })
      .addCase(getAllFavoritesCats.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.favorites = state.favorites.concat(action.payload);
        }
      })
      .addCase(getAllFavoritesCats.rejected, (state) => {
        state.loading = false;
        state.errorMessage = ERROR_MESSAGE;
      });
    builder
      .addCase(deleteFavoriteCat.pending, (state) => {
        state.loading = true;
        state.errorMessage = undefined;
      })
      .addCase(deleteFavoriteCat.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter((cat) => cat.id !== action.payload?.id);
      })
      .addCase(deleteFavoriteCat.rejected, (state) => {
        state.loading = false;
        state.errorMessage = ERROR_MESSAGE;
      });
  },
});

export const {
  saveAsFavorite,
  setErrorMessage,
  setCurrentPageWithAllCats,
  setCurrentPageWithFavoritesCats,
  setFavoritesCatsPageCount,
} = catsSlice.actions;
export default catsSlice.reducer;
