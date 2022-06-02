import { AnyAction, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import {
  deleteCatAsFavorite,
  getCats,
  getFavoriteImageById,
  getFavoritesCats,
  saveCatAsFavorite
} from '../service/axiosWorker';
import { AxiosError } from 'axios';
import { CatResponse, FavoritesCatsResponse, SaveAsFavoriteResponse } from '../models/CatResponse';
import {
  getItemFromFavoritesStorage,
  removeFromStorage,
  setItemInStorage
} from '../service/localStorage.service';
import { saveAsFavorite, setErrorMessage } from './catsSlice';

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
      if (!error.response)
        throw error;
    }
});

export const getAllFavoritesCats = createAsyncThunk(
  'images/getFavorites',
  async (page?: number) => {
    try {
      return await getFavoritesCats(page)
        .then((res) => res.data);
    } catch (e: any) {
      const error: AxiosError<any> = e;
      if (!error.response)
        throw error;
    }
});

export const saveFavorite = async (item: CatResponse, dispatch: Dispatch<AnyAction>) => {
  try {
    const res: SaveAsFavoriteResponse = await saveCatAsFavorite(item);
    const favorite = await getFavoriteImageById(res.id);
    setItemInStorage(favorite);
    dispatch(saveAsFavorite(favorite));
  } catch (e) {
    dispatch(setErrorMessage());
  }
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
