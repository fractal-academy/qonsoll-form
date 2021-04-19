import React, { useEffect } from 'react'
import './CustomButton.styles.css'
import { Button } from 'antd'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function CustomButton(props) {
  const { buttonType, children, ...args } = props

  // [COMPUTED PROPERTIES]
  const styleMap = {
    primary: { style: 'primaryButton' },
    secondary: { style: 'secondaryButton' }
  }
  const style = styleMap[buttonType].style

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
    <Button className={style} type={buttonType} {...args}>
      {children}
    </Button>
  )
}

CustomButton.propTypes = {
  buttonType: PropTypes.string.isRequired
}

export default CustomButton
