import React from 'react';
import { CatsPinterestState } from '../models/catsPinterestState';

export const CurrencyContext = React.createContext<CatsPinterestState | null>(null);

export const useCurrency = () => React.useContext(CurrencyContext);

