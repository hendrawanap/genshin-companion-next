import React, {useState, createContext, useEffect} from 'react';
import firebaseInit from '../../firebase/init';

export const ResinContext = createContext();

export const ResinProvider = props => {
  const [originalResin, setOriginalResin] = useState(0);
  const [condensedResin, setCondensedResin] = useState(0);
  const [updateDate, setUpdateDate] = useState(null);
  const [firebase, setFirebase] = useState(firebaseInit().firestore());
  useEffect(() => {
    if (!updateDate) {
      fetchUpdateDate();
    }
    const incrementOriginalResin = setInterval(() => {
      setOriginalResin(originalResin+1);
    }, 1000 * 60 * 8);
    return () => clearInterval(incrementOriginalResin)
  },[originalResin]);

  const fetchUpdateDate = async () => {
    const snapshot = await firebase.collection("resin").where("userId", "==", 1).get()
                        .then((snapshot) => {
                          return snapshot.docs[0];
                        });
    const updateDate = snapshot.get("updatedOn");
    const originalResin = snapshot.get("originalResin");
    const condensedResin = snapshot.get("condensedResin");
    setUpdateDate(updateDate);
    const now = new Date();
    const resinAdded = (now.getTime() - updateDate.toMillis()) / 1000 / 60 / 8;
    setOriginalResin(originalResin + parseInt(resinAdded));
    setCondensedResin(condensedResin);
  }

  
  // incrementOriginalResin();
  return (
    <ResinContext.Provider value={[originalResin, setOriginalResin, condensedResin, setCondensedResin]}>
      {props.children}
    </ResinContext.Provider>
  )
}