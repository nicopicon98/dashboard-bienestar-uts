import React, { useEffect, useReducer, useState } from 'react'

interface NextAppointmentTimerInterface {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

const initialState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
}

enum NxtAppTmActionKind {
  GET_TIME = 'GET_TIME',
}

interface NxtAppTmAction {
  type: NxtAppTmActionKind;
  payload: number;
}

const dateReducer = (state: NextAppointmentTimerInterface, action: NxtAppTmAction) => {
  if (action.type === NxtAppTmActionKind.GET_TIME) {
    return {
      ...state,
      days: Math.floor(action.payload / (1000 * 60 * 60 * 24)),
      hours: Math.floor((action.payload / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((action.payload / 1000 / 60) % 60),
      seconds: Math.floor((action.payload / 1000) % 60),
      formatted: `${Math.floor(action.payload / (1000 * 60 * 60 * 24)) === 0 ? "" : Math.floor(action.payload / (1000 * 60 * 60 * 24))+"d :"} 
      ${Math.floor((action.payload / (1000 * 60 * 60)) % 24)}h : 
      ${Math.floor((action.payload / 1000 / 60) % 60)}m :
      ${Math.floor((action.payload / 1000) % 60)}s`
    }
  }
}

const useNextAppointmentTimer = (deadline: string) => {

  const [state, dispatch] = useReducer(dateReducer, initialState as never)

  const getTime = (deadline: string) => {
    console.log("called")
    const time = Date.parse(deadline) - Date.now();
    dispatch({ type: NxtAppTmActionKind.GET_TIME, payload: time })
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);
    return () => clearInterval(interval);
  }, []);
  return {
    nxtAppmtTmrState: state
  }
}

export default useNextAppointmentTimer