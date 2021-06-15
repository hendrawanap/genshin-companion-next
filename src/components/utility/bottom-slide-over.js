import { Transition } from '@headlessui/react'
import { useRef, useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";

export default function BottomSlideOver(props) {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    ref.current = document.getElementById('bottom-slide-over')
    setMounted(true)
  }, ['bottom-slide-over'])

  return mounted ? ReactDOM.createPortal(
    <Transition as="div" className="fixed inset-0 z-40" show={props.isOpen}>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-in-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`fixed inset-0 min-h-screen bg-black bg-opacity-80`} onClick={props.close}>
        </div>
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
      >
        <div className={`fixed inset-0 bg-navbar`}>
          {props.children}
        </div>
      </Transition.Child>
    </Transition>,
    document.getElementById('bottom-slide-over')
  ) : null;
}