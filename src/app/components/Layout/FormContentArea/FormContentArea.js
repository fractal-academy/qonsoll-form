import React, { useEffect, useState } from 'react'
import { Content } from 'antd-styled'
import { Row, Col, Box } from '@qonsoll/react-design'
import './FormContentArea.style.css'
import MiddleContainer from '../MiddleContainer'

// import PropTypes from 'prop-types'
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
    <Box display="flex" px={45} py={4} overflow="auto">
      <Box pr={2}>{leftSideMenu}</Box>
      <Content
        backgroundColor="white"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
          borderRadius: '10px'
        }}
        className="custom-scroll">
        {children}
      </Content>
    </Box>
  )
}

FormContentArea.propTypes = {}

export default FormContentArea
