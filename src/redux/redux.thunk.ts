import { AnyAction, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import {
  deleteCatAsFavorite,
  getCats, getFavoriteImageById,
  getFavoritesCats,
  saveCatAsFavorite
} from '../service/axiosWorker';
import { AxiosError } from 'axios';
import {
  CatFavorite,
  CatResponse,
  FavoritesCatsResponse,
  SaveAsFavoriteResponse
} from '../models/CatResponse';
import {
  getItemFromFavoritesStorage,
  removeFromStorage,
  setItemInStorage
} from '../service/localStorage.service';
import { saveAsFavorite, setErrorMessage } from './catsSlice';
import { FavoriteRequestParams } from '../models/propsTypes';

export const getAllCats = createAsyncThunk(
  'images/getAll',
  async (page: number) => {
    try {
      const images = await getCats(page).then((res) => ({
        pageCount: res.headers['pagination-count'],
        data: res.data
      }));
      return images;
    } catch (e: any) {
      const error: AxiosError<any> = e;
      if (!error.response)
        throw error;
    }
});

export const getAllFavoritesCats = createAsyncThunk(
  'images/getFavorites',
  async (reqParams: FavoriteRequestParams) => {
    try {
      const favorites = await getFavoritesCats(reqParams.limit, reqParams.page).then((res) => res.data);
      return favorites;
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
