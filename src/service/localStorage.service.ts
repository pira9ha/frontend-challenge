import { CatResponse, FavoritesCatsResponse } from '../models/catResponse';

export const getFavoritesFromStorage = (key = 'favorites') => {
  const storageData = localStorage.getItem(key);
  return storageData ? JSON.parse(storageData) : [];
};

export const getItemFromFavoritesStorage = (item: CatResponse) => {
  const favorites = getFavoritesFromStorage();
  return favorites.find((cat: FavoritesCatsResponse) => cat.image_id === item?.id);
};

export const setItemInStorage = (item?: FavoritesCatsResponse, key = 'favorites') => {
  const favorites = getFavoritesFromStorage();
  const existFavorite = favorites.find((cat: FavoritesCatsResponse) => cat.image_id === item?.image_id);
  if (existFavorite)
    return;

  favorites.push(item);

  localStorage.setItem(key, JSON.stringify(favorites));
};

export const removeFromStorage = (item: FavoritesCatsResponse) => {
  let favorites = getFavoritesFromStorage();

  if (favorites.length === 0)
    return;

  favorites = favorites.filter((cat: FavoritesCatsResponse) => cat.id !== item.id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
