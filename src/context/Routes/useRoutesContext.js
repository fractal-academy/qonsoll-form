import { useContext } from 'react'
import { RoutesContext } from './RoutesContext'

export const useRoutesContext = () =>
  useContext(RoutesContext)
