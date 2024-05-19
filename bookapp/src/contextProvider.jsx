import {createContext} from 'react'

export const Context = createContext();

export function ContextProvider({children,value}) {

  return (
    <Context.Provider value={value}>
        {children}
    </Context.Provider>
  )
}