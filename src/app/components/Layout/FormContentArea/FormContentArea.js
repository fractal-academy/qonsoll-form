import React, { useEffect, useState } from 'react'
import { Box, Row, Col } from '@qonsoll/react-design'
import { Button } from 'antd'
import './FormContentArea.styles.css'
import PropTypes from 'prop-types'
import MiddleContainer from '../MiddleContainer'
import { ROUTES_PATHS } from 'app/constants'
import { useHistory } from 'react-router'
// import { useTranslation } from 'react-i18next'

function FormContentArea(props) {
  const { children, leftSideMenu } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const history = useHistory()
  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onCancel = () => {
    history.push(ROUTES_PATHS.FORMS_ALL)
  }
  const onCreateForm = () => {
    history.push(ROUTES_PATHS.FORMS_ALL)
  }
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
    <>
      <Box display="flex" px={45} my={3} py={3} height="100%" overflow="auto">
        <Box pr={2}>{leftSideMenu}</Box>
        <Box
          backgroundColor="white"
          className="content-style custom-scroll"
          p={3}
          overflow="auto">
          <MiddleContainer>{children}</MiddleContainer>
        </Box>
      </Box>
      <Row h="right" pb={4} pr={45}>
        <Col cw="auto">
          <Button type="text" onClick={onCancel}>
            Cancel
          </Button>
        </Col>
        <Col cw="auto">
          <Button type="primary" onClick={onCreateForm}>
            Create form
          </Button>
        </Col>
      </Row>
    </>
  )
}

FormContentArea.propTypes = {
  leftSideMenu: PropTypes.element,
  children: PropTypes.node
}

export default FormContentArea
