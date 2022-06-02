import axios from 'axios';
import {
  ALL_IMAGES_API,
  API_KEY,
  BASE_URL,
  CURRENT_USER,
  FAVORITES_API, LIMIT_IMAGES
} from '../constants/service';
import { CatResponse, FavoritesCatsResponse } from '../models/CatResponse';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

export const getCats = async (page: number) => await axiosInstance.get(ALL_IMAGES_API, {
  params: {
    limit: LIMIT_IMAGES,
    page: page,
    order: 'asc',
  }
});

export const getFavoritesCats = async (page?: number) => await axiosInstance.get(FAVORITES_API, {
  params: {
    limit: LIMIT_IMAGES,
    page: page,
    sub_id: CURRENT_USER
  }
});

export const saveCatAsFavorite = async (cat?: CatResponse) => {
  if (!cat)
    return;

  const res = await axiosInstance.post(FAVORITES_API, {
    image_id: cat.id,
    sub_id: CURRENT_USER,
  });
  return res.data;
};

export const deleteCatAsFavorite = async (cat?: FavoritesCatsResponse) => {
  if (!cat)
    return;

  return await axiosInstance.delete(`${FAVORITES_API}/${cat.id}`, {
    params: {
      sub_id: CURRENT_USER,
    }
  });
};

export const getFavoriteImageById = async (imageId: string) => {
  if (!imageId)
    return;

  return await axiosInstance.get(`${FAVORITES_API}/${imageId}`, {
    params: {
      sub_id: CURRENT_USER,
    }
  }).then((res) => res.data);
};
