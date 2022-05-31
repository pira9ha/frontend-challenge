import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { CatResponse, FavoritesCatsResponse } from '../models/CatResponse';
import { KittenCard } from '../components/Card/KittenCard';
import { CardContainer } from '../components/styles/styledComponenets';
import { useInfiniteScroll } from '../service/useInfiniteScroll';
import { getAllCats } from '../redux/redux.thunk';
import { setCurrentPageWithFavoritesCats } from '../redux/catsSlice';

export const FavoriteCats = () => {
  const dispatch = useAppDispatch();
  const { favorites, currentFavoritesPage, loading, favoritesPagesCount } = useSelector((state: RootState) => state.catsWorker);
  useInfiniteScroll(getAllCats, currentFavoritesPage, favoritesPagesCount);
  const observeElement = useRef<any>(null);

  const handleObserver = useCallback((node: any) => {
    if (loading || favoritesPagesCount === 0) return;
    if (observeElement.current) {
      observeElement.current.disconnect();
    }
    observeElement.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(setCurrentPageWithFavoritesCats());
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
