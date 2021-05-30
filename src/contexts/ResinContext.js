import React, {useState, createContext} from 'react';

export const ResinContext = createContext();

export const ResinProvider = props => {
  const [currentResin, setCurrentResin] = useState(98);
  
  return (
    <ResinContext.Provider value={[currentResin, setCurrentResin]}>
      {props.children}
    </ResinContext.Provider>
  )
}