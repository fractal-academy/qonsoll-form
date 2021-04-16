import React, { useEffect, useState } from 'react'
import { Input, Typography } from 'antd'
import { styles } from './TextEditable.styles'
import { styles1 } from './TextEditable.styles'
import PropTypes from 'prop-types'

const { TextArea } = Input
// import { useTranslation } from 'react-i18next'

function TextEditable(props) {
  const { onChange, textSecondary, placeholder, isTitle } = props
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
  //TODO: Replace inline colors to theme vars
  return (
    <TextArea
      style={{
        ...(isTitle ? styles.title : styles.default),
        ...(textSecondary ? styles.grayColor : styles.blackColor)
      }}
      bordered={false}
      onChange={setTextValue}
      placeholder={placeholder}
      autoSize
      {...props}
    />
  )
}

TextEditable.propTypes = {
  onChange: PropTypes.func.isRequired,
  textSecondary: PropTypes.bool,
  isTitle: PropTypes.bool,
  placeholder: PropTypes.string.isRequired
}

export default TextEditable
