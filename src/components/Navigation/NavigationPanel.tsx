import React from 'react';
import { Header, NavigationLink } from '../styles/styledComponenets';
import { allCatsPath, favoriteCatsPath } from '../../constants/paths';

export const NavigationPanel = () => {
  return(
    <Header>
      <NavigationLink to={allCatsPath} >
        Все котики
      </NavigationLink>
      <NavigationLink to={favoriteCatsPath}>
        Любимые котики
      </NavigationLink>
    </Header>
  );
};
