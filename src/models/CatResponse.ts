export interface CatResponse {
  id: string;
  url: string;
  breeds: any[];
  categories: any[];
}
 export interface CatFavorite extends CatResponse {
  favoriteId: string;
 }

 export interface SaveAsFavoriteResponse {
  message: string;
  id: string;
 }

 export interface FavoritesCatsResponse {
  id: string;
  sub_id: string;
  image_id: string;
  created_at: string;
  image: {
    id: string;
    url: string;
  }
 }
