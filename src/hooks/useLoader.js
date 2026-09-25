import { createContext, useContext } from 'react'

// `ready` flips to true once the preloader has finished, so
// hero animations can wait for the curtain before playing.
export const LoaderContext = createContext({ ready: true })
export const useLoader = () => useContext(LoaderContext)
