import Header from "@/components/app/header";
import NavigationBar from "@/components/app/navigation-bar";
import { useState } from "react";
import Head from "next/head";
import { ResinProvider } from "@/contexts/ResinContext";

export default function AppLayout(props) {
  return (
    <>
      <Head>
        <title>Genshin Companion</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      </Head>
      <ResinProvider>
        <AppContent>
          {props.children}
        </AppContent>
      </ResinProvider>
      <div id="modal-1"></div>
      <div id="bottom-slide-over"></div>
    </>
  );
}

function AppContent(props) {
  const [openNavbar, setOpenNavbar] = useState(false);
  return (
    <div className="bg-black bg-opacity-90 text-white container-sm min-h-screen mx-auto relative">
      <Header openNavbar={() => setOpenNavbar(true)}/>
      <NavigationBar isOpen={openNavbar} close={() => setOpenNavbar(false)}/>
      <div className="pt-14 py-2">
        {props.children}
      </div>
    </div>
  );
}