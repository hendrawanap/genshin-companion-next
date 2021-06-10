import ReactDOM from 'react-dom';

export function Modal(props) {
  const OVERLAY_STYLES = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "fixed",
    zIndex: props.stack ? 80 : 60
  }
  const MODAL_FULL_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: props.stack ? 90 : 70
  }
  const MODAL_STYLES = {
    position: 'fixed',
    top: '64px',
    left: '10%',
    right: '10%',
    zIndex: props.stack ? 90 : 70
  }
  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-80" style={OVERLAY_STYLES} onClick={props.closeHandler}></div>
      <div className={`${props.isFull ? "" : "sm:max-w-min sm:min-w-md sm:left-0 sm:right-0 sm:mx-auto"}`} style={props.isFull ? MODAL_FULL_STYLES : MODAL_STYLES}>
        {props.children}
      </div>
    </>,
    document.getElementById(props.stack ? 'portal-2' : 'portal-1')
  );
}

// export { Modal, modalHandler };