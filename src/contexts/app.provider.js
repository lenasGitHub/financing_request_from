import React, { useReducer } from 'react'
import { AppContext } from './app.context'

function reducer (state, action) {
  switch (action.type) {
    case 'SET_IS_OPEC_MEMBER':
      return {
        ...state,
        isOpecMember: action.payload.isOpecMember
      }
   
    default:
      return state
  }
}

export const AppProvider = ({ children, initData }) => {
  const [appState, appDispatch] = useReducer(reducer, [initData])

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  )
}
