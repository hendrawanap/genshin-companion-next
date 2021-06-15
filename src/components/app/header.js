import { useState } from "react";
import Modal from "@/components/utility/modal";
import AccountsModal from "@/components/app/accounts-modal";
import Image from "next/image";
import Link from "next/link";

export default function Header(props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <header className='flex h-14 items-center justify-between px-3 bg-navbar fixed z-30 top-0 left-0 right-0'>
      <button
        className="opacity-90 material-icons"
        id="navbar-btn"
        onClick={() => props.openNavbar()}
      >
        menu
      </button>
      <Link href="/home"><div className="relative" style={{height: '36px', width: '120px'}}><Image src="/assets/img/Logo.png" layout="fill" objectFit="contain" quality={100}/></div></Link>
      <img
        className="w-8 rounded-full"
        src="https://img-os-static.hoyolab.com/communityWeb/upload/cb31fe8dae809ebdbc72039cba527501.png"
        alt="Profile"
        onClick={() => setOpenModal(true)}
      />
      <Modal isFull= {false} isOpen={openModal} closeHandler={() => setOpenModal(false)}>
        <AccountsModal closeHandler={() => setOpenModal(false)}/>
      </Modal>
    </header>
  );
}