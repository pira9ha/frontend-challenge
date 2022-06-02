import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { CatResponse, FavoritesCatsResponse } from '../models/CatResponse';
import { KittenCard } from '../components/Card/KittenCard';
import { CardContainer } from '../components/styles/styledComponents';
import { useInfiniteScroll } from '../service/useInfiniteScroll';
import { getAllFavoritesCats } from '../redux/redux.thunk';
import { setCurrentPageWithFavoritesCats } from '../redux/catsSlice';
import { LIMIT_IMAGES } from '../constants/service';
import { getFavoritesFromStorage } from '../service/localStorage.service';

export const FavoriteCats = () => {
  const dispatch = useAppDispatch();
  const { favorites, currentFavoritesPage, loading, favoritesPagesCount } = useSelector((state: RootState) => state.catsWorker);
  const reqParams = useRef(0);
  useInfiniteScroll(getAllFavoritesCats, currentFavoritesPage, favoritesPagesCount, reqParams.current, true);
  const observeElement = useRef<any>(null);

  const handleObserver = useCallback((node: any) => {
    if (
      loading ||
      favoritesPagesCount === 0 ||
      currentFavoritesPage + 1 >= favoritesPagesCount
    ) return;
    if (observeElement.current) {
      observeElement.current.disconnect();
    }
    observeElement.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const favoritesInStorage = getFavoritesFromStorage();

        if (favoritesPagesCount - 1 === currentFavoritesPage + 1) {
          const favoritesCount = favoritesInStorage.length % LIMIT_IMAGES;
          console.log( favoritesCount );
          reqParams.current = favoritesCount;
          dispatch(setCurrentPageWithFavoritesCats());
        } else if (favoritesPagesCount - 1 > currentFavoritesPage + 1) {
          reqParams.current = LIMIT_IMAGES;
          dispatch(setCurrentPageWithFavoritesCats());
        } else {
          return;
        }
      }
    });
    if (node) {
      observeElement.current?.observe(node);
    }
  },[loading]);

  return(
    <CardContainer>
      {favorites.length === 0
        ? (<span>Тут еще нет ни одного котика =(</span>)
        : favorites?.map((cat: FavoritesCatsResponse, index: number) => {
          if (index === favorites.length - 1) {
            return (
              <KittenCard item={cat.image as CatResponse} key={cat.id} innerRef={handleObserver} />
            );
          }
          return (
            <KittenCard item={cat.image as CatResponse} key={cat.id} />
          );
        })
      }
    </CardContainer>
  );
};
