import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../redux/store';

export const useInfiniteScroll = (
  loadFunction: any,
  currentPage: number,
  pageCount: number,
  uniqLimit?: number,
  favorites = false
) => {
  const dispatch = useAppDispatch();

  const onScrollContainer = useCallback(() => {
    const params = uniqLimit ? { page: currentPage, limit: uniqLimit } : currentPage;
    console.log(uniqLimit, params);
    dispatch(loadFunction(params));
  }, [currentPage]);

  useEffect(() => {
    if (favorites && uniqLimit === 0) {
      console.log('uniqLimit');
      return;
    }

    if (currentPage > 1 && currentPage < pageCount) {
      onScrollContainer();
    }
  }, [currentPage, uniqLimit]);
};
