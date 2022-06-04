import { AnyAction, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import {
  deleteCatAsFavorite,
  getCats,
  getFavoriteImageById,
  getFavoritesCats,
  saveCatAsFavorite
} from '../service/axiosWorker';
import { AxiosError } from 'axios';
import { CatResponse, FavoritesCatsResponse, SaveAsFavoriteResponse } from '../models/catResponse';
import {
  getFavoritesFromStorage,
  getItemFromFavoritesStorage,
  removeFromStorage,
  setItemInStorage
} from '../service/localStorage.service';
import { saveAsFavorite, setErrorMessage } from './catsSlice';
import { ERROR_MESSAGE } from '../constants/service';

export const getAllCats = createAsyncThunk(
  'images/getAll',
  async (page: number) => {
    try {
      return await getCats(page)
        .then((res) => ({
          pageCount: res.headers['pagination-count'],
          data: res.data
        }));
    } catch (e: any) {
      const error: AxiosError<any> = e;
      return error.response?.data;
    }
});

export const getAllFavoritesCats = createAsyncThunk(
  'images/getFavorites',
  async (page?: number) => {
    try {
      const favorites = getFavoritesFromStorage();
      const response: FavoritesCatsResponse[] = await getFavoritesCats(page)
        .then((res) => res.data);
      return response.filter((cat: FavoritesCatsResponse) => favorites.find((item: FavoritesCatsResponse) => item.id === cat.id));
    } catch (e: any) {
      const error: AxiosError<any> = e;
      return error.response?.data;
    }
});

export const saveFavorite = (item: CatResponse) => {
  return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const res: SaveAsFavoriteResponse = await saveCatAsFavorite(item);
        const favorite = await getFavoriteImageById(res.id);
        setItemInStorage(favorite);
        dispatch(saveAsFavorite(favorite));
      } catch (e: any) {
        dispatch(setErrorMessage(ERROR_MESSAGE));
      }
    };
};

export const deleteFavoriteCat = createAsyncThunk(
  'delete/favorite',
  async (item: CatResponse) => {
    const catToDelete: FavoritesCatsResponse = getItemFromFavoritesStorage(item);
    if (!catToDelete) {
      return;
    }

    const res = await deleteCatAsFavorite(catToDelete);
    if (res?.status === 200) {
      removeFromStorage(catToDelete);
    }
    return catToDelete;
});
