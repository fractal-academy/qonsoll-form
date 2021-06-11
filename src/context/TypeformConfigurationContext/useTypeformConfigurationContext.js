import { useContext } from 'react'
import { TypeformConfigurationContext } from './TypeformConfigurationContext'

export const useTypeformConfigurationContext = () =>
  useContext(TypeformConfigurationContext)
