import React, { useEffect, useState } from 'react'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea
} from 'components'
import { Col, Container, Row, Box } from '@qonsoll/react-design'
import MediaLibraryModal from 'domains/MediaLibrary/combined/MediaLibraryModal'

// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function FormEdit(props) {
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
    <Box bg="#f6f9fe" display="flex" height="inherit" overflowX="hidden">
      <PageLayout>
        <FormContentArea leftSideMenu={<QuestionLayoutSwitcher />}>
          {/* Here should be QuestionForm  */}
          <MediaLibraryModal btnProps={{ children: 'Press' }} />
        </FormContentArea>
      </PageLayout>

      <EditorSidebar />
    </Box>
  )
}

FormEdit.propTypes = {}

export default FormEdit
