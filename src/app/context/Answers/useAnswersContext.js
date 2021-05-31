import { useContext } from 'react'
import { AnswersContext, AnswersContextDispatch } from './AnswersContext'

export const useAnswersContext = () => useContext(AnswersContext)
export const useAnswersContextDispatch = () =>
  useContext(AnswersContextDispatch)
