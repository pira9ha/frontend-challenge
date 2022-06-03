import React from 'react';
import sadCat from '../../styles/images/sadCat.png';
import { Modal } from 'components/styled/styledComponents';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CloseButton } from './CloseButton';

export const ModalWindow = () => {
  const { errorMessage } = useSelector((state: RootState) => state.catsWorker);

  return(
    <Modal>
      <img src={sadCat} alt='Sad Cat'/>
      <span className="text-waiting">{errorMessage}</span>
      <CloseButton />
    </Modal>
  );
};
