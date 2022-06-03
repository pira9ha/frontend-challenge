import dancingCat from '../../styles/images/dancingCat.gif';
import React from 'react';
import { LostCatContainer } from '../styled/styledComponents';

export const EmptyDataInfo = () => {
  return(
    <LostCatContainer>
      <img src={dancingCat} alt='Dancing cute kitten'/>
      <span className="text-waiting">Скоро тут будут котики!</span>
    </LostCatContainer>
  );
};
