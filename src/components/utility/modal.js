import { Transition } from '@headlessui/react';
import { useRef, useState, useEffect, Fragment } from "react";
import ReactDOM from 'react-dom';

export default function Modal(props) {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    ref.current = document.getElementById('modal-1')
    setMounted(true)
  }, ['modal-1'])

  return mounted ? ReactDOM.createPortal(
    <Transition as="div" className="fixed inset-0 z-50" show={props.isOpen}>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-in-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-black bg-opacity-80 fixed inset-0" onClick={props.closeHandler}></div>
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-in-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`fixed top-20 left-0 right-0 max-w-xs mx-auto`}>
          {props.children}
        </div>
      </Transition.Child>
    </Transition>,
    document.getElementById('modal-1')
  ) : null;
}