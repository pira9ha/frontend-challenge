import React, { useCallback, useRef } from 'react';
import { CardContainer } from '../components/styles/styledComponenets';
import { KittenCard } from '../components/Card/KittenCard';
import { CatResponse } from '../models/CatResponse';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { setCurrentPageWithAllCats } from '../redux/catsSlice';
import { useInfiniteScroll } from '../service/useInfiniteScroll';
import { getAllCats } from '../redux/redux.thunk';

export const AllCats = () => {
  const dispatch = useAppDispatch();
  const { cats, currentPage, loading, pagesCount } = useSelector((state: RootState) => state.catsWorker);
  useInfiniteScroll(getAllCats, currentPage, pagesCount);
  const observeElement = useRef<any>(null);

  const handleObserver = useCallback((node: any) => {
      if (loading) return;
      if (observeElement.current) {
        observeElement.current.disconnect();
      }
      observeElement.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(setCurrentPageWithAllCats());
        }
      });
      if (node) {
        observeElement.current?.observe(node);
      }
    },[loading]);

  return (
    <CardContainer>
      {cats.length === 0
        ? (<span>Тут еще нет ни одного котика =(</span>)
        : cats?.map((cat: CatResponse, index: number) => {
            if (index === cats.length - 1) {
              return (
                <KittenCard item={cat} key={cat.id} innerRef={handleObserver} />
              );
            }
          return (
            <KittenCard item={cat} key={cat.id} />
          );
          }
        )
      }
    </CardContainer>
  );
};
