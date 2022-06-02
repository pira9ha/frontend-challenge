import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ALL_CATS_PATH, FAVORITES_CATS_PATH } from './constants/paths.router';
import { AllCats } from './pages/AllCats';
import { FavoriteCats } from './pages/FavoriteCats';
import GlobalStyles from 'styles/globalStyles';
import { NavigationPanel } from './components/Navigation/NavigationPanel';
import { getAllCats, getAllFavoritesCats } from './redux/redux.thunk';
import { RootState, useAppDispatch } from './redux/store';
import { getFavoritesFromStorage } from './service/localStorage.service';
import { useSelector } from 'react-redux';
import { Loader } from './components/Loader';
import { LIMIT_IMAGES } from './constants/service';
import { setFavoritesCatsPageCount } from './redux/catsSlice';

function App() {
  const dispatch = useAppDispatch();
  const { loading, currentPage, favoritesPagesCount } = useSelector((state: RootState) => state.catsWorker);

  useEffect(() => {
    const favorites = getFavoritesFromStorage();
    if (favorites.length > 0) {
      let limitImage;
      if (favorites.length <= LIMIT_IMAGES) {
        limitImage = favorites.length;
      } else {
        limitImage = LIMIT_IMAGES;
        dispatch(setFavoritesCatsPageCount(Math.ceil(favorites.length / LIMIT_IMAGES)));
      }
      dispatch(getAllFavoritesCats({
        limit: limitImage,
        page: favoritesPagesCount === 0 ? undefined : favoritesPagesCount
      }));
    }
    dispatch(getAllCats(currentPage));
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <NavigationPanel />
      <main>
        <Routes>
          <Route path={ALL_CATS_PATH} element={<AllCats />} />
          <Route path={FAVORITES_CATS_PATH} element={<FavoriteCats />} />
        </Routes>
        {loading && <Loader />}
      </main>
    </>
  );
}

export default App;
