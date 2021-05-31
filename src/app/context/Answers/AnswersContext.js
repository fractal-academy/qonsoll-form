import React, { useReducer } from 'react'
import AnswersContextReducer from './AnswersContextReducer'
import PropTypes from 'prop-types'

export const AnswersContext = React.createContext()
export const AnswersContextDispatch = React.createContext()

const AnswersContextProvider = (props) => {
  const { children } = props
  const [answers, dispatch] = useReducer(AnswersContextReducer, {})

  return (
    <AnswersContextDispatch.Provider value={dispatch}>
      <AnswersContext.Provider value={answers}>
        {children}
      </AnswersContext.Provider>
    </AnswersContextDispatch.Provider>
  )
}

AnswersContextProvider.propTypes = {
  children: PropTypes.node
}

export default AnswersContextProvider
