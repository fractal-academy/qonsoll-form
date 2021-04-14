import React, { useEffect, useState } from 'react'
import './CustomButton.styles.css'
import { Button } from 'antd'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function CustomButton(props) {
  const { buttonType, children } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const style = (buttonType === 'secondary' && 'secondaryButton') || ''

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
    <Button className={style} type={buttonType}>
      {children}
    </Button>
  )
}

CustomButton.propTypes = {
  buttonType: PropTypes.string.isRequired,
  buttonText: PropTypes.string
}

export default CustomButton
