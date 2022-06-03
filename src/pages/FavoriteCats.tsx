import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { CatResponse, FavoritesCatsResponse } from '../models/catResponse';
import { KittenCard } from '../components/Card/KittenCard';
import { CardContainer } from '../components/styled/styledComponents';
import { getAllFavoritesCats } from '../redux/redux.thunk';
import { setCurrentPageWithFavoritesCats } from '../redux/catsSlice';
import { EmptyDataInfo } from '../components/EmptyDataInfo/EmptyDataInfo';
import { getFavoritesFromStorage } from '../service/localStorage.service';

export const FavoriteCats = () => {
  const dispatch = useAppDispatch();
  const {
    favorites,
    currentFavoritesPage,
    loading,
    favoritesPagesCount
  } = useSelector((state: RootState) => state.catsWorker);
  const observeElement = useRef<any>(null);
  const isMounted = useRef(false);
  const favoritesFromStorage = getFavoritesFromStorage();

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }
    if (
      loading === 0 &&
      favorites.length === 0 &&
      favoritesPagesCount === 1
    ) {
      if (favoritesFromStorage.length > 0) {
        dispatch(getAllFavoritesCats(favoritesFromStorage.slice(0)));
      } else {
        localStorage.clear();
      }
    }
  }, [favorites, favoritesPagesCount]);

  useEffect(() => {
    if (isMounted.current) {
      if (currentFavoritesPage > 0 && currentFavoritesPage + 1 < favoritesPagesCount) {
        dispatch(getAllFavoritesCats(currentFavoritesPage));
      }
    } else {
      isMounted.current = true;
    }
  }, [currentFavoritesPage]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    if (loading > 0) return;

    if (entities[0].isIntersecting) {
      dispatch(setCurrentPageWithFavoritesCats());
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      if (loading > 0) return;

      const option = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      };

      if (favorites.length === favoritesFromStorage.length) {
        dispatch(setCurrentPageWithFavoritesCats(favoritesPagesCount));
      } else {
        const observer = new IntersectionObserver(handleObserver, option);
        if (observeElement.current) {
          if (currentFavoritesPage + 1 >= favoritesPagesCount) {
            observer.disconnect();
          }
          observer.observe(observeElement.current);
        }
        return () => observer.disconnect();
      }

    }
  }, [loading]);

  return (
    <CardContainer>
      {favorites.length === 0
        ? (<EmptyDataInfo/>)
        : favorites?.map((cat: FavoritesCatsResponse, index: number) => {
          if (index === favorites.length - 1) {
            return (
              <KittenCard item={cat.image as CatResponse} key={cat.id} innerRef={observeElement}/>
            );
          }
          return (
            <KittenCard item={cat.image as CatResponse} key={cat.id}/>
          );
        })
      }
    </CardContainer>
  );
};
