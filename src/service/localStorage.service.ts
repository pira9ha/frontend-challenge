import { CatResponse } from '../models/CatResponse';

export const getItemFromStorage = (key = 'favorites') => {
  const storageData = localStorage.getItem(key);
  return storageData ? JSON.parse(storageData) : [];
};

export const setItemInStorage = (item?: CatResponse, key = 'favorites') => {
  console.log('here', item);
  const favorites = getItemFromStorage();
  favorites.push(item);

  localStorage.setItem(key, JSON.stringify(favorites));
};

export const removeFromStorage = (item: CatResponse) => {
  let favorites = getItemFromStorage();

  if (favorites.length === 0)
    return;

  favorites = favorites.filter((cat: CatResponse) => cat.id !== item.id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
