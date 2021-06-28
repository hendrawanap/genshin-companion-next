import { fetchUserResin } from 'pages/api/resin';
import React, {useState, createContext, useEffect, useReducer} from 'react';
import firebaseInit from '../../firebase/init';

export const ResinContext = createContext();

export const ResinProvider = props => {
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
      case 'setIntOriResin':
        return {...state, intOriResin: payload};
      case 'setFullAt':
        return {...state, fullAt: payload};
      case 'setMillisFullAt':
        return {...state, millisFullAt: payload};
      case 'setTimeRemaining':
        return {...state, timeRemaining: payload};
      case 'setFloatOriResin':
        return {...state, floatOriResin: payload};
      case 'setCondensedResin':
        return {...state, condensedResin: payload};
      case 'setUpdatedOn':
        return {...state, updatedOn: payload};
      case 'setFetchTime':
        return {...state, fetchTime: payload};
      case 'setTimer':
        return {...state, timer: payload};
      default:
        console.log(type);
        return { ...state };
    }
  };
  const initialState = {
    intOriResin: 0,
    floatOriResin: 0,
    fullAt: "12:00",
    millisFullAt: 0,
    timeRemaining: { hours: 0, minutes: 0 },
    condensedResin: 0,
    updatedOn: null,
    fetchTime: null,
    firebase: firebaseInit(),
    timer: null
  };
  const MAX_ORIGINAL_RESIN = 160;
  const SECOND_TO_MILLIS = 1000;
  const MINUTE_TO_SECOND = 60;
  const HOUR_TO_MINUTE = 60;
  const MINUTES_PER_RESIN = 8;
  const [state, dispatch] = useReducer(reducer, initialState);
  const userId = 1;

  useEffect(async () => {
    const { intOriResin, floatOriResin, millisFullAt, timer } = state;
    if (!state.updatedOn) {
      await calculateCurrentResin();
    } else {
      const incrementOriResin = () => {
        if (intOriResin !== MAX_ORIGINAL_RESIN) {
          const firebase = firebaseInit();
          const now = firebase.firestore.Timestamp.now().toMillis();
          const currentFloatOriResin = floatOriResin + 1 / MINUTES_PER_RESIN;
          const currentIntOriResin = parseInt(currentFloatOriResin);
          dispatch({ type: 'setFloatOriResin', payload: currentFloatOriResin });
          currentIntOriResin !== intOriResin && dispatch({ type: 'setIntOriResin', payload: currentIntOriResin});
        }
      };
  
      dispatch({
        type: 'setTimer',
        payload: setTimeout(() => {
        incrementOriResin();
        calculateTimeRemaining(millisFullAt);
      }, SECOND_TO_MILLIS * MINUTE_TO_SECOND),
      });
  
      return () => clearTimeout(timer);
    }
  }, [state.timeRemaining]);

  const calculateCurrentResin = async () => {
    const { updatedOn, condensedResin, originalResin } = await fetchUserResin(userId);
    const firebase = firebaseInit();
    const now = firebase.firestore.Timestamp.now().toMillis();
    const resinAdded = calculateResinAdded(now, updatedOn);
    dispatch({ type: 'setFloatOriResin', payload: originalResin + resinAdded });
    dispatch({ type: 'setIntOriResin', payload: parseInt(originalResin + resinAdded) });
    dispatch({ type: 'setUpdatedOn', payload: updatedOn });
    dispatch({ type: 'setCondensedResin', payload: condensedResin });
    calculateFullAt(updatedOn, originalResin);
  };

  const calculateResinAdded = (now, updatedOn) => (now - updatedOn) / SECOND_TO_MILLIS / MINUTE_TO_SECOND / MINUTES_PER_RESIN;

  const incrementOriginalResin = async (value) => {
    clearTimeout(state.timer);
    const firebase = firebaseInit();
    const { floatOriResin, updatedOn } = state;
    const now = firebase.firestore.Timestamp.now().toMillis();
    const newCurrentResin = floatOriResin + value;
    const snapshot = await firebase.firestore().collection("resin").where("userId", "==", 1).get();
    const doc = snapshot.docs[0];
    const res = await doc.ref.update({
      originalResin: newCurrentResin,
      updatedOn: firebase.firestore.FieldValue.serverTimestamp()
    });
    dispatch({ type: 'setIntOriResin', payload: parseInt(newCurrentResin) });
    dispatch({ type: 'setFloatOriResin', payload: newCurrentResin });
    dispatch({ type: 'setUpdatedOn', payload: now });
    calculateFullAt(updatedOn, newCurrentResin);
  };

  const calculateFullAt = (updatedOn, floatOriResin) => {
    const remainingResin = MAX_ORIGINAL_RESIN - floatOriResin;
    const fullAt = new Date(updatedOn + parseInt(remainingResin * MINUTES_PER_RESIN * MINUTE_TO_SECOND * SECOND_TO_MILLIS));
    dispatch({ type: 'setFullAt', payload: `${fullAt.getHours()}:${fullAt.getMinutes() < 10 ? "0" + fullAt.getMinutes() : fullAt.getMinutes()}` });
    dispatch({ type: 'setMillisFullAt', payload: fullAt.getTime()})
    calculateTimeRemaining(fullAt.getTime());
  };

  const calculateTimeRemaining = (fullAt) => {
    const now = Date.now();
    let hoursRemaining = 0;
    let minutesRemaining = 0;
    if (fullAt > now) {
      hoursRemaining = parseInt((fullAt - now) / 1000 / 60 / 60);
      minutesRemaining = parseInt((fullAt - now) / 1000 / 60 % 60)
    }
    dispatch({ type: 'setTimeRemaining', payload: { hours: hoursRemaining, minutes: minutesRemaining }});
  }

  return (
    <ResinContext.Provider value={{ ...state, dispatch, incrementOriginalResin }}>
      {props.children}
    </ResinContext.Provider>
  );
}