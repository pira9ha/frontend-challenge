import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { CatResponse, FavoritesCatsResponse } from '../models/CatResponse';
import { KittenCard } from '../components/Card/KittenCard';
import { CardContainer } from '../components/styles/styledComponents';
import { getAllFavoritesCats } from '../redux/redux.thunk';
import { setCurrentPageWithFavoritesCats } from '../redux/catsSlice';
import { LostCats } from '../components/LostCats';
import { getFavoritesFromStorage } from '../service/localStorage.service';

export const FavoriteCats = () => {
  const dispatch = useAppDispatch();
  const { favorites, currentFavoritesPage, loading, favoritesPagesCount } = useSelector((state: RootState) => state.catsWorker);
  const observeElement = useRef<any>(null);
  const isMounted = useRef(false);
  const favoritesFromStorage = getFavoritesFromStorage();

  useEffect(() => {
    if (isMounted.current) {
      if (favorites.length === 0 && favoritesPagesCount === 1) {
        dispatch(getAllFavoritesCats(favoritesFromStorage.slice(0)));
      }
    }
  }, [favorites, favoritesPagesCount]);

  useEffect(() => {
    if (isMounted.current) {
      if (currentFavoritesPage > 0 && currentFavoritesPage < favoritesPagesCount) {
        dispatch(getAllFavoritesCats(currentFavoritesPage));
      }
    } else {
      isMounted.current = true;
    }
  }, [currentFavoritesPage]);

  const handleObserver = (entities:  IntersectionObserverEntry[]) => {
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

  return(
    <CardContainer>
      {favorites.length === 0
        ? (<LostCats/>)
        : favorites?.map((cat: FavoritesCatsResponse) =>
            <KittenCard item={cat.image as CatResponse} key={cat.id} />
          )
      }
      <div ref={observeElement}/>
    </CardContainer>
  );
};
