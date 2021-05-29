function Modal(props) {
  return ([
    <div className={`modal${props.isActive ? ' active':''}`} onClick={props.closeHandler}></div>,
    <div className={`modal-content${props.isActive ? ' active':''}`}>{props.children}</div>
  ])
}
const openModal = (setModalContent, setModalOpen, content) => {
  setModalContent(content);
  setModalOpen(true);
}
const modalHandler = (setModalContent, setModalOpen) => {
  return {
    open: (content) => openModal(setModalContent, setModalOpen, content),
    close: () => setModalOpen(false)
  }
};

export { Modal, modalHandler };