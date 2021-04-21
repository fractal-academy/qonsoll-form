import React, { useReducer } from 'react'
import formContextReducer from './FormContextReducer'
import PropTypes from 'prop-types'

export const FormContext = React.createContext()
export const FormContextDispatch = React.createContext()

const FormContextProvider = (props) => {
  const { children } = props
  const [forms, dispatch] = useReducer(formContextReducer, [])

  return (
    <FormContextDispatch.Provider value={dispatch}>
      <FormContext.Provider value={forms}>{children}</FormContext.Provider>
    </FormContextDispatch.Provider>
  )
}

FormContextProvider.propTypes = {
  children: PropTypes.node
}

export default FormContextProvider
