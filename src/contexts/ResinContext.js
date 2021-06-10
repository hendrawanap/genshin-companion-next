import React, {useState, createContext} from 'react';

export const ResinContext = createContext();

export const ResinProvider = props => {
  const [originalResin, setOriginalResin] = useState(60);
  const [condensedResin, setCondensedResin] = useState(2);
  
  return (
    <ResinContext.Provider value={[originalResin, setOriginalResin, condensedResin, setCondensedResin]}>
      {props.children}
    </ResinContext.Provider>
  )
}