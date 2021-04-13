import React, { useEffect, useState } from 'react'
import { Content } from 'antd-styled'
import { Box } from '@qonsoll/react-design'
import './FormContentArea.styles.css'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function FormContentArea(props) {
  const { children, leftSideMenu } = props
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

  return (
    <Box display="flex" px={45} py={20} my={20} overflow="auto" height="100%">
      <Box pr={2}>{leftSideMenu}</Box>
      <Content backgroundColor="white" className="content-style custom-scroll ">
        {children}
      </Content>
    </Box>
  )
}

FormContentArea.propTypes = {
  leftSideMenu: PropTypes.element,
  children: PropTypes.node
}

export default FormContentArea
