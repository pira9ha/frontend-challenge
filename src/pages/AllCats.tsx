import React, { useContext } from 'react';
import { CardContainer } from '../components/styles/styledComponenets';
import { KittenCard } from '../components/Card/KittenCard';
import { CurrencyContext } from '../components/context';
import { CatResponse } from '../models/CatResponse';

export const AllCats = () => {
  const state = useContext(CurrencyContext);

  return (
    <CardContainer>
      {state?.cats?.map((cat: CatResponse) => <KittenCard item={cat} key={cat.id} />)}
    </CardContainer>
  );
};
