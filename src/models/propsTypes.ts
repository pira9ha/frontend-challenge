import { CatResponse, FavoritesCatsResponse } from './CatResponse';

export type CardProps = {
  item: CatResponse;
  innerRef?: any;
};
export type FavoriteCardProps = {
  item: FavoritesCatsResponse;
};
export type LikeProps = {
  favorite: boolean;
};

export type FavoriteRequestParams = {
  page?: number;
  limit: number;
};
