import { CatResponse } from './catResponse';

export type CardProps = {
  item: CatResponse;
  innerRef?: any;
};

export type HeartButtonProps = {
  load: number;
};

export type LikeProps = {
  favorite: boolean;
};

export type FavoriteRequestParams = {
  page?: number;
  limit: number;
};
