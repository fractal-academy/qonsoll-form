import React, { useEffect, useState } from 'react'
import { EditorSidebar, PageEditorWrapper, PageHeader } from 'components'
import { Col, Container, Row, Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import FormContentArea from '../FormContentArea'
import { QuestionLayoutSwitcher } from '../../'
import MiddleContainer from '../MiddleContainer'
// import { useTranslation } from 'react-i18next'

function PageLayout(props) {
  const { title = 'New Form', children } = props
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
    <Box display="flex" flex={1} flexDirection="column">
      <PageHeader title={title} />
      {children}
    </Box>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default PageLayout
