import React, { useEffect, useState } from 'react'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea
} from 'components'
import { Box } from '@qonsoll/react-design'
import { QuestionForm } from 'app/domains/Question/components'
import { LAYOUT_TYPES, QUESTION_TYPES } from 'app/constants'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function FormEdit(props) {
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  const [activeKey, setActiveKey] = useState(LAYOUT_TYPE_KEYS[0])
  const [questionType, setQuestionType] = useState(QUESTION_TYPES.YES_NO)
  const [showPopover, setshowPopover] = useState(false)
  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onChangeMenuItem = ({ key }) => {
    setActiveKey(LAYOUT_TYPES[key])
  }
  const onQuestionTypeChange = ({ key }) => {
    setQuestionType(key)
    setshowPopover(false)
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
    <Box bg="#f6f9fe" display="flex" height="inherit" overflowX="hidden">
      <PageLayout>
        <FormContentArea
          leftSideMenu={
            <QuestionLayoutSwitcher
              onChange={onChangeMenuItem}
              defaultActive={activeKey}
            />
          }>
          <QuestionForm
            question={{
              questionType: questionType,
              layoutType: activeKey
            }}
            onQuestionTypeChange={onQuestionTypeChange}
            showPopover={showPopover}
            setshowPopover={setshowPopover}
          />
        </FormContentArea>
      </PageLayout>

      <EditorSidebar />
    </Box>
  )
}

FormEdit.propTypes = {}

export default FormEdit
