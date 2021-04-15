import React, { useReducer } from 'react'
import formContextReducer from './FormContextReducer'
import PropTypes from 'prop-types'

export const FormContext = React.createContext()
export const FormContextDispatch = React.createContext()

const FormContextProvider = (props) => {
  const { children } = props
  const [state, dispatch] = useReducer(formContextReducer)

  return (
    <FormContext.Provider value={state}>
      <FormContextDispatch.Provider value={dispatch}>
        {children}
      </FormContextDispatch.Provider>
    </FormContext.Provider>
  )
}

FormContextProvider.propTypes = {
  children: PropTypes.node
}

export default FormContextProvider
