import { CatsPinterestState } from '../models/catsPinterestState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesCatsResponse } from '../models/catResponse';
import { deleteFavoriteCat, getAllCats, getAllFavoritesCats } from './redux.thunk';
import { ERROR_MESSAGE } from '../constants/service';

const initialState: CatsPinterestState = {
  loading: 0,
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
    setCurrentPageWithFavoritesCats: (state, action: PayloadAction<number | undefined>) => {
      state.currentFavoritesPage = action.payload ? action.payload : state.currentFavoritesPage + 1;
    },
    setFavoritesCatsPageCount: (state, action: PayloadAction<number>) => {
      state.favoritesPagesCount = action.payload + 1;
      state.currentFavoritesPage = 0;
    },
    setErrorMessage: (state, action: PayloadAction<string | undefined>) => {
      state.errorMessage = action.payload;
    },
    saveAsFavorite: (state, action: PayloadAction<FavoritesCatsResponse>) => {
      state.favorites.push(action.payload);
      state.errorMessage = undefined;
    },
    addToFavorites: (state, action: PayloadAction<FavoritesCatsResponse[]>) => {
      state.favorites = state.favorites.concat(action.payload);
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCats.pending, (state) => {
        state.loading += 1;
        state.errorMessage = undefined;
      })
      .addCase(getAllCats.fulfilled, (state, action) => {
        state.loading -= 1;
        const result = action.payload?.data;
        state.pagesCount = action.payload ? +action.payload.pageCount + 1 : -1;
        state.cats = [...state.cats, ...result];
      })
      .addCase(getAllCats.rejected, (state) => {
        state.loading -= 1;
        state.errorMessage = ERROR_MESSAGE;
      });
    builder
      .addCase(getAllFavoritesCats.pending, (state) => {
        state.loading += 1;
        state.errorMessage = undefined;
      })
      .addCase(getAllFavoritesCats.fulfilled, (state, action) => {
        state.loading -= 1;
        if (action.payload) {
          state.favorites = [...state.favorites, ...action.payload];
        }
      })
      .addCase(getAllFavoritesCats.rejected, (state) => {
        state.loading -= 1;
        state.errorMessage = ERROR_MESSAGE;
      });
    builder
      .addCase(deleteFavoriteCat.pending, (state) => {
        state.loading += 1;
        state.errorMessage = undefined;
      })
      .addCase(deleteFavoriteCat.fulfilled, (state, action) => {
        state.loading -= 1;
        state.favorites = state.favorites.filter((cat) => cat.id !== action.payload?.id);
      })
      .addCase(deleteFavoriteCat.rejected, (state) => {
        state.loading -= 1;
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
  addToFavorites
} = catsSlice.actions;
export default catsSlice.reducer;
