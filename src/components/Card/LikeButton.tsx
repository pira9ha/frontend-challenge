import React, { useEffect, useState } from 'react';
import { Heart } from '../styled/styledComponents';
import { CardProps } from '../../models/propsTypes';
import { SvgOutline } from './SvgHearts/SvgOutline';
import { SvgLiked } from './SvgHearts/SvgLiked';
import { SvgClicked } from './SvgHearts/SvgClicked';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { deleteFavoriteCat, saveFavorite } from '../../redux/redux.thunk';
import { setFavoritesCatsPageCount } from '../../redux/catsSlice';
import { LIMIT_IMAGES } from '../../constants/service';
import { getFavoritesFromStorage } from '../../service/localStorage.service';

export const LikeButton = ({ item }: CardProps) => {
  const dispatch = useAppDispatch();
  const { favorites } = useSelector((state: RootState) => state.catsWorker);
  const [ liked, setLiked ] = useState(false);

  useEffect(() => {
    if (favorites) {
      const existFavorite = favorites.find((cat) => cat.image_id === item?.id);
      if (existFavorite)
        setLiked(true);
    }
  }, [favorites]);

  return(
    <Heart onClick={() => {
      const favoritesFromStorage = getFavoritesFromStorage().length;
      if (!liked) {
        dispatch(saveFavorite(item));
        setLiked(true);
        dispatch(setFavoritesCatsPageCount(~~(favoritesFromStorage / LIMIT_IMAGES)));
      } else {
        dispatch(deleteFavoriteCat(item));
        setLiked(false);
        dispatch(setFavoritesCatsPageCount(~~(favoritesFromStorage / LIMIT_IMAGES)));
      }
    }}>
      <SvgOutline />
      <SvgLiked favorite={liked} />
      <SvgClicked />
    </Heart>
  );
};
