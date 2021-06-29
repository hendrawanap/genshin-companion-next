import { createContext, useReducer } from "react";


export const UserContext = createContext();

export const UserProvider = props => {
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
      default:
        console.log(`No such command exists: "${type}"`);
        return state;
    }
  }
  const initialState = {
    userId: 2,
    ar: 56,
    mainCharacter: 'Lumine',
    nickname: 'Tabibito',
    wl: 8
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{...state}}>
      { props.children }
    </UserContext.Provider>
  );
}