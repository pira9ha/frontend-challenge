import React from 'react';
import { InitialState } from '../constants/initialState';

export const CurrencyContext = React.createContext<InitialState | null>(null);

export const useCurrency = () => React.useContext(CurrencyContext);

