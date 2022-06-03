import { CatResponse, FavoritesCatsResponse } from './catResponse';

export interface CatsPinterestState {
  loading: number;
  pagesCount: number;
  favoritesPagesCount: number;
  currentPage: number;
  currentFavoritesPage: number;
  errorMessage?: string;
  cats: CatResponse[];
  favorites: FavoritesCatsResponse[];
}
