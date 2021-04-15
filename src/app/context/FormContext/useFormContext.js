import { useContext } from 'react'
import { FormContext, FormContextDispatch } from './FormContext'

export const useFormContext = () => useContext(FormContext)
export const useFormContextDispatch = () => useContext(FormContextDispatch)
