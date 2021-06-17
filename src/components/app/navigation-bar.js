import Image from "next/image";
import { Transition } from '@headlessui/react'
import { Fragment } from "react";

export default function NavigationBar(props) {
  const nav_list = [
    {to: '/home', icon:'home', name:'Home', id:'home'},
    {to: '/my-weapons', icon:'home', name:'My Weapons', id:'my-weapons'},
    {to: '/my-characters', icon:'people', name:'My Characters', id:'my-characters'},
    {to: '/resin-manager', icon:'home', name:'Resin Manager', id:'resin-manager'},
    {to: '/settings', icon:'settings', name:'Settings', id:'settings'}
  ]
  return (
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
        <div className={`fixed inset-0 min-h-screen bg-black bg-opacity-80`} onClick={props.close}>
        </div>
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <nav className={`fixed inset-0 w-9/12`}>
          <div className="bg-dark-5 min-h-screen w-full flex flex-col items-start px-4 py-2">
          <div className="relative ml-8 mb-4" style={{height: '36px', width: '120px'}}><Image src="/assets/img/Logo.png" layout="fill" objectFit="contain" quality={100}/></div>
            <ul className="nav-list">
              {
                nav_list.map((nav_item, index) => (
                  <li className="nav-item" key={`nav-${index}`}>
                    <div key={nav_item.id} className="flex py-2 text-white text-opacity-medium tracking-wide" id={`link-${nav_item.id}`} to={nav_item.to}>
                      <span className="material-icons mr-6">{nav_item.icon}</span><span>{nav_item.name}</span>
                    </div>
                  </li>
                ))
              }
            </ul>
            <div className="flex py-2 text-white text-opacity-medium absolute bottom-4 left-4">
              <span className="material-icons mr-6 transform rotate-180">logout</span><span>Logout</span>
            </div>
          </div>
        </nav>
      </Transition.Child>
    </Transition>
  );
}