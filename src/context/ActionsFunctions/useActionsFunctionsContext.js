import { useContext } from 'react'
import { ActionsFunctionsContext } from './ActionsFunctionsContext'

export const useActionsFunctionsContext = () =>
  useContext(ActionsFunctionsContext)
