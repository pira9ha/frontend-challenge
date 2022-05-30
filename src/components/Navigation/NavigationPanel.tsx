import React from 'react';
import { Header, NavigationLink } from '../styles/styledComponenets';
import { ALL_CATS_PATH, FAVORITES_CATS_PATH } from '../../constants/paths';

export const NavigationPanel = () => {
  return(
    <Header>
      <NavigationLink to={ALL_CATS_PATH} >
        Все котики
      </NavigationLink>
      <NavigationLink to={FAVORITES_CATS_PATH}>
        Любимые котики
      </NavigationLink>
    </Header>
  );
};
