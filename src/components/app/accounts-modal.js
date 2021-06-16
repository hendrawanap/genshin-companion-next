import { useState } from "react";
import Button from "@/material/button";
import { CSSTransition } from "react-transition-group";

export default function AccountsModal(props) {
  const initialCardHeight = 166;
  const [cardHeight, setCardHeight] = useState(initialCardHeight);
  const calculateHeight = (el) => {
    const height = el.offsetHeight + initialCardHeight;
    setCardHeight(height);
  };
  const setDefaultHeight = () => {
    setCardHeight(initialCardHeight);
  }
  return (
    <div className="bg-navbar p-4 rounded-md transition-height duration-300" id="accounts-modal" style={{height: cardHeight}}>
      <div className="flex items-center mb-3 text-lg text-white text-opacity-80">
        <button className="material-icons mr-8" id="accounts-close" onClick={props.closeHandler}>close</button>
        Accounts
      </div>
      <AccountsModalContent calculateHeight={calculateHeight} setDefaultHeight={setDefaultHeight}/>
    </div>
  );
}

function AccountsModalContent(props) {
  const accounts = [
    { nickname: 'Tabibito', ar: 55, profile: 'https://img-os-static.hoyolab.com/communityWeb/upload/cb31fe8dae809ebdbc72039cba527501.png'},
    { nickname: 'Lumine', ar: 45, profile: 'https://img-os-static.hoyolab.com/communityWeb/upload/cb31fe8dae809ebdbc72039cba527501.png'},
    { nickname: 'Aether', ar: 33, profile: 'https://img-os-static.hoyolab.com/communityWeb/upload/cb31fe8dae809ebdbc72039cba527501.png'},
    { nickname: 'Diluc', ar: 28, profile: 'https://img-os-static.hoyolab.com/communityWeb/upload/cb31fe8dae809ebdbc72039cba527501.png'},
  ]
  const accountsMenus = [
    { icon: 'person_add', inner: 'Add another accounts'},
    { icon: 'manage_accounts', inner: 'Manage all account on this device'}
  ]
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`content${isExpanded ? ' expanded' : ''}`}>
      { <Account
          key={currentAccount.nickname}
          account={currentAccount}
          isCurrent={true}
          handleExpand={() => setIsExpanded(!isExpanded)}
      /> }
      <button className="border border-white border-opacity-30 rounded-full px-3 py-1 ml-14 font-medium tracking-wide text-sm text-white text-opacity-60 whitespace-nowrap" id="manage-account">Manage this account</button>
      <CSSTransition
        in={isExpanded}
        classNames="card-expand"
        timeout={100}
        unmountOnExit
        onEnter={props.calculateHeight}
        onExit={props.setDefaultHeight}
      >
        <div>
        <div className="mt-4 ml-14 border-b border-white border-opacity-30"></div>
        { accounts.filter(account => account.nickname !== currentAccount.nickname)
          .map(account => <Account key={account.nickname} account={account}/>) }
        { accountsMenus.map(menu => <div key={menu.icon} className="flex items-center pl-2 py-3 text-white text-opacity-60"><span className="mr-5 material-icons">{menu.icon}</span>{menu.inner}</div>) }
        </div>
      </CSSTransition> 
    </div>
  )
}

function Account(props) {
  return (
    <div className={`account${props.isCurrent ? ' current' : ''} flex items-center py-3`}>
      <img className="w-10 rounded-full mr-4" src={props.account.profile}/>
      <div className="flex flex-col flex-1">
        <div className="font-medium tracking-wider text-white text-opacity-80">{props.account.nickname}</div>
        <div className="text-xs text-white text-opacity-40">Adventure Rank {props.account.ar}</div>
      </div>
      { props.isCurrent ? 
        <button className="text-white text-opacity-60 material-icons border border-white border-opacity-30 rounded-full" id="more-accounts" onClick={props.handleExpand}>expand_more</button>
        :
        <Button variant="primary" type="text">Switch</Button>
      }
    </div>
  )
}