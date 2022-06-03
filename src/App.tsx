import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ALL_CATS_PATH, FAVORITES_CATS_PATH } from './constants/paths.router';
import { AllCats } from './pages/AllCats';
import { FavoriteCats } from './pages/FavoriteCats';
import GlobalStyles, { theme } from 'styles/globalStyles';
import { NavigationPanel } from './components/Navigation/NavigationPanel';
import { getAllCats, getAllFavoritesCats } from './redux/redux.thunk';
import { RootState, useAppDispatch } from './redux/store';
import { getFavoritesFromStorage } from './service/localStorage.service';
import { useSelector } from 'react-redux';
import { CatLoader } from './components/CatLoader/CatLoader';
import { LIMIT_IMAGES } from './constants/service';
import { setErrorMessage, setFavoritesCatsPageCount } from './redux/catsSlice';
import { ModalWindow } from './components/ModalWindow/ModalWindow';
import { ThemeProvider } from 'styled-components';

function App() {
  const dispatch = useAppDispatch();
  const { loading, currentPage, errorMessage } = useSelector((state: RootState) => state.catsWorker);

  useEffect(() => {
    const favorites = getFavoritesFromStorage();
    if (favorites.length > 0) {
      dispatch(getAllFavoritesCats());
    }
    dispatch(setFavoritesCatsPageCount(~~(favorites.length / LIMIT_IMAGES)));
    dispatch(getAllCats(currentPage));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 5000);
    }
  }, [errorMessage]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <NavigationPanel />
      {errorMessage && <ModalWindow />}
      <main>
        <Routes>
          <Route path={ALL_CATS_PATH} element={<AllCats />} />
          <Route path={FAVORITES_CATS_PATH} element={<FavoriteCats />} />
        </Routes>
        {loading > 0 && <CatLoader />}
      </main>
    </ThemeProvider>
  );
}

export default App;
