import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../redux/store';

export const useInfiniteScroll = (loadFunction: any, page: number, pageCount: number) => {
  const dispatch = useAppDispatch();

  const onScrollContainer = useCallback(() => {
    dispatch(loadFunction(page));
  }, [page]);

  useEffect(() => {
    if (page > 1 && page > pageCount) {
      onScrollContainer();
    }
  }, [page]);
};
