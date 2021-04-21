import React, { useEffect, useState } from 'react'
import { Box, Col, Row } from '@qonsoll/react-design'
import { Spin } from 'antd'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function Spinner(props) {
  // const { WRITE_PROPS_HERE } = props
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
    <Row height="100%" weight="100%">
      <Col>
        <Box position="absolute" top="50%" left="50%">
          <Spin size="large" />
        </Box>
      </Col>
    </Row>
  )
}

Spinner.propTypes = {}

export default Spinner
