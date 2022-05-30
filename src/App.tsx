import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ALL_CATS_PATH, FAVORITES_CATS_PATH } from './constants/paths';
import { AllCats } from './pages/AllCats';
import { FavoriteCats } from './pages/FavoriteCats';
import GlobalStyles from 'styles/globalStyles';
import { NavigationPanel } from './components/Navigation/NavigationPanel';
import { getCats } from './service/axiosWorker';
import { CurrencyContext } from './components/context';
import { InitialState } from './models/initialState';
import { getItemFromStorage } from './service/localStorage.service';
import { ERROR_MESSAGE } from './constants/service';

function App() {
  const [cats, setCats] = useState<InitialState>({ load: true, favorites: [] });

  useEffect(() => {
    try {
      getCats().then((res) => {
          const favoritesFromStorage = getItemFromStorage();
          setCats((prev) => ({
            ...prev,
            load: false,
            cats: res.data,
            favorites: favoritesFromStorage
          }));
      });
    } catch (e) {
      setCats((prev) => ({ ...prev, load: false, errorMessage: ERROR_MESSAGE }));
    }
  }, []);

  return (
    <CurrencyContext.Provider value={cats}>
      <GlobalStyles />
      <NavigationPanel />
      <main>
      <Routes>
        <Route path={ALL_CATS_PATH} element={<AllCats />} />
        <Route path={FAVORITES_CATS_PATH} element={<FavoriteCats />} />
      </Routes>
      </main>
    </CurrencyContext.Provider>
  );
}

export default App;
