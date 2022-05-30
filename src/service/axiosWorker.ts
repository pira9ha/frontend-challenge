import axios from 'axios';
import { apiKey } from '../constants/service';
import { CatResponse } from '../models/CatResponse';
import { currentUser } from '../constants/user';
import { setItemInStorage } from './localStorage.service';

export const axiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'x-api-key': apiKey,
  },
});

export const getCats = async () => await axiosInstance.get('images/search', {
  params: {
    limit: 15,
    page: 1,
    order: 'asc',
  }
});

export const saveCatAsFavorite = async (cat?: CatResponse) => {
  if (!cat)
    return;

  try {
    await axiosInstance.post('favourites', {
      image_id: cat.id,
      sub_id: currentUser,
    });
  } catch (e) {
    throw new Error('Не получилось сохранить котика =(');
  }
};

export const deleteCatAsFavorite = async (cat?: CatResponse) => {
  if (!cat)
    return;

  try {
    await axiosInstance.delete(`favourites/${cat.id}`, {
      params: {
        sub_id: currentUser,
      }
    });
  } catch (e) {
    throw new Error('Что-то не получилось =(');
  }
};
