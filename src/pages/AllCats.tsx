import React, { useEffect, useRef } from 'react';
import { CardContainer } from '../components/styled/styledComponents';
import { KittenCard } from '../components/Card/KittenCard';
import { CatResponse } from '../models/catResponse';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { setCurrentPageWithAllCats } from '../redux/catsSlice';
import { getAllCats } from '../redux/redux.thunk';
import { EmptyDataInfo } from '../components/EmptyDataInfo/EmptyDataInfo';

export const AllCats = () => {
  const dispatch = useAppDispatch();
  const { cats, currentPage, loading, pagesCount } = useSelector((state: RootState) => state.catsWorker);
  const observeElement = useRef<any>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (currentPage > 1 && currentPage < pagesCount) {
        dispatch(getAllCats(currentPage));
      }
    } else {
      isMounted.current = true;
    }
  }, [currentPage]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      dispatch(setCurrentPageWithAllCats());
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      if (loading > 0) return;

      const option = {
        root: null,
        rootMargin: '0px',
        threshold: 1
      };

      const observer = new IntersectionObserver(handleObserver, option);
      if (observeElement.current) {
        if (currentPage + 1 >= pagesCount) {
          observer.disconnect();
        }
        observer.observe(observeElement.current);
      }

      return () => observer.disconnect();
    } else {
      isMounted.current = true;
    }
  }, [handleObserver]);

  return (
    <CardContainer>
      {cats.length === 0
        ? (<EmptyDataInfo/>)
        : cats?.map((cat: CatResponse, index: number) => {
            if (index === cats.length - 1) {
              return (
                <KittenCard item={cat} key={cat.id} innerRef={observeElement} />
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
