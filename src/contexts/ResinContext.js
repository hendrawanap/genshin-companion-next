import { fetchUserResin, updateUserCondensedResin, updateUserOriginalResin } from 'pages/api/resin';
import React, {useState, createContext, useEffect, useReducer, useContext} from 'react';
import firebaseInit from '../../firebase/init';
import { UserContext } from './UserContext';

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
    timer: null
  };
  const MAX_ORIGINAL_RESIN = 160;
  const SECOND_TO_MILLIS = 1000;
  const MINUTE_TO_SECOND = 60;
  const HOUR_TO_MINUTE = 60;
  const MINUTES_PER_RESIN = 8;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userId } = useContext(UserContext);

  useEffect(async() => {
    const { intOriResin, floatOriResin, millisFullAt, timer } = state;
    if (!state.updatedOn) {
      const userResin = await fetchUserResin(userId);
      calculateCurrentResin(userResin);
    } else if (intOriResin !== MAX_ORIGINAL_RESIN) {
      const incrementOriResin = () => {
        const currentFloatOriResin = floatOriResin + 1 / MINUTES_PER_RESIN;
        const currentIntOriResin = parseInt(currentFloatOriResin);
        dispatch({ type: 'setFloatOriResin', payload: currentFloatOriResin });
        currentIntOriResin !== intOriResin && dispatch({ type: 'setIntOriResin', payload: currentIntOriResin});
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

  const calculateCurrentResin = (userResin) => {
    const { updatedOn, condensedResin, originalResin, now } = userResin;
    const resinAdded = calculateResinAdded(now, updatedOn);
    const currentOriResin = originalResin + resinAdded;
    dispatch({ type: 'setFloatOriResin', payload: currentOriResin > MAX_ORIGINAL_RESIN ? MAX_ORIGINAL_RESIN : currentOriResin });
    dispatch({ type: 'setIntOriResin', payload: currentOriResin > MAX_ORIGINAL_RESIN ? MAX_ORIGINAL_RESIN : parseInt(currentOriResin) });
    dispatch({ type: 'setUpdatedOn', payload: updatedOn });
    dispatch({ type: 'setCondensedResin', payload: condensedResin });
    calculateFullAt(updatedOn, originalResin);
  };

  const calculateResinAdded = (now, updatedOn) => (now - updatedOn) / SECOND_TO_MILLIS / MINUTE_TO_SECOND / MINUTES_PER_RESIN;

  const incrementOriginalResin = async (value) => {
    const { floatOriResin } = state;
    const newCurrentResin = floatOriResin + value;
    const updatedOn = await updateUserOriginalResin(userId, newCurrentResin);
    clearTimeout(state.timer);
    dispatch({ type: 'setIntOriResin', payload: parseInt(newCurrentResin) });
    dispatch({ type: 'setFloatOriResin', payload: newCurrentResin });
    dispatch({ type: 'setUpdatedOn', payload: updatedOn });
    calculateFullAt(updatedOn, newCurrentResin);
    console.log('increment original resin');
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

  const incrementCondensedResin = async(value) => {
    const { condensedResin } = state;
    const newCurrentResin = condensedResin + value;
    await updateUserCondensedResin(userId, newCurrentResin);
    dispatch({ type: 'setCondensedResin', payload: newCurrentResin });
    console.log('increment condensed resin');
  }

  return (
    <ResinContext.Provider value={{ ...state, incrementCondensedResin, incrementOriginalResin }}>
      {props.children}
    </ResinContext.Provider>
  );
}