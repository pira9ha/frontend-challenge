import { CatResponse } from './CatResponse';

export interface InitialState {
  load: boolean;
  errorMessage?: string;
  cats?: CatResponse[];
  favorites: CatResponse[];
}
