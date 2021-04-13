import React, { useEffect, useState } from 'react'
import { Menu, Typography } from 'antd'
import { Box, Row, Col } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function PageEditorWrapper(props) {
  const { children } = props
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

  return <Box>{children}</Box>
}

PageEditorWrapper.propTypes = {
  children: PropTypes.node
}

export default PageEditorWrapper
