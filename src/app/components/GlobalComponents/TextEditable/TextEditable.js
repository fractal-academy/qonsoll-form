import React, { useEffect, useState } from 'react'
import { Input, Typography } from 'antd'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function TextEditable(props) {
  const { onChange } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  const [textValue, setTextValue] = useState()

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

  return (
    <Input
      style={{ border: 0 }}
      onChange={setTextValue}
      placeholder="change default text"
    />
  )
}

TextEditable.propTypes = {}

export default TextEditable
