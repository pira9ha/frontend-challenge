import axios from 'axios';
import { ALL_IMAGES_API, API_KEY, BASE_URL, FAVORITES_API } from '../constants/service';
import { CatResponse } from '../models/CatResponse';
import { currentUser } from '../constants/user';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

export const getCats = async () => await axiosInstance.get(ALL_IMAGES_API, {
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
    await axiosInstance.post(FAVORITES_API, {
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
    await axiosInstance.delete(`${FAVORITES_API}/${cat.id}`, {
      params: {
        sub_id: currentUser,
      }
    });
  } catch (e) {
    throw new Error('Что-то не получилось =(');
  }
};
