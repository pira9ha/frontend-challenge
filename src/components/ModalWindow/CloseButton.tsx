import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { SvgCross } from './SvgCross';
import { setErrorMessage } from '../../redux/catsSlice';
import { Button } from 'components/styled/styledComponents';

export const CloseButton = () => {
  const dispatch = useAppDispatch();

  return(
    <Button onClick={() => dispatch(setErrorMessage(undefined))}>
      <SvgCross />
    </Button>
  );
};
