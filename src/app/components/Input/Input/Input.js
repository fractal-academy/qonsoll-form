import React, { useEffect, useState } from 'react'
import { Input as AntInput } from 'antd'
import { PhoneInput } from 'antd-styled'
import { Row } from '@qonsoll/react-design'

// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

const Input = (props) => {
  const { phone } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])
  //[TEMPLATE]
  return <Row ml={20}>{phone ? <PhoneInput /> : <AntInput {...props} />}</Row>
}

//Accepts all parameters that the Ant Design same component have
Input.propTypes = {}

export default Input
