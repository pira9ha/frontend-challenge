import { CatResponse } from '../models/CatResponse';

export type InitialState = {
  load: boolean;
  errorMessage?: string;
  cats?: CatResponse[];
  favorites: CatResponse[];
};
