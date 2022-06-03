import dancingCat from '../styles/images/dancingCat.gif';
import React from 'react';
import { LostCatContainer } from './styles/styledComponents';

export const LostCats = () => {
  return(
    <LostCatContainer>
      <img src={dancingCat} alt='Dancing cute kitten'/>
      <span className="text-waiting">Скоро тут будут котики!</span>
    </LostCatContainer>
  );
};
