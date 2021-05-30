import React, {useState, createContext} from 'react';
import { modalHandler } from '../components/Modal';

export const ModalContext = createContext();

export const ModalProvider = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(() => null);
  const handler = modalHandler(setModalContent, setModalOpen);

  return (
    <ModalContext.Provider value={[handler, modalOpen, modalContent]}>
      {props.children}
    </ModalContext.Provider>
  )
}