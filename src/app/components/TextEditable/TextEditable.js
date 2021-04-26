import React, { useEffect } from 'react'
import { Input } from 'antd'
import { styles } from './TextEditable.styles'
import PropTypes from 'prop-types'

const { TextArea } = Input
// import { useTranslation } from 'react-i18next'

function TextEditable(props) {
  const { textSecondary, placeholder, isTitle, onChange, onBlur, value } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]

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
    <TextArea
      style={{
        ...(isTitle ? styles.title : styles.default),
        ...(textSecondary ? styles.grayColor : styles.blackColor)
      }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      bordered={false}
      placeholder={placeholder}
      autoSize
      {...props}
    />
  )
}

TextEditable.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  textSecondary: PropTypes.bool,
  isTitle: PropTypes.bool,
  placeholder: PropTypes.string.isRequired
}

export default TextEditable
