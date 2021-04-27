import React, { useEffect, useState } from 'react'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea,
  Spinner
} from 'components'
import { Box } from '@qonsoll/react-design'
import { QuestionForm } from 'app/domains/Question/components'
import { LAYOUT_TYPES, QUESTION_TYPES } from 'app/constants'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
import { useFormContext, useFormContextDispatch } from 'app/context/FormContext'
import DISPATCH_EVENTS from 'app/context/FormContext/DispatchEventsTypes'
import { useParams } from 'react-router'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { getCollectionRef } from 'app/services/Firestore'
import COLLECTIONS from 'app/constants/collection'

function FormEdit(props) {
  // [ADDITIONAL HOOKS]
  const { id } = useParams()
  const [form, formLoading] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const [questionsList, questionsListLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', id)
  )

  //[COMPONENT STATE HOOKS]
  const [activeKey, setActiveKey] = useState(LAYOUT_TYPE_KEYS[0])
  const [questionType, setQuestionType] = useState(QUESTION_TYPES.YES_NO)
  const [showPopover, setshowPopover] = useState(false)
  // [CUSTOM_HOOKS]
  const formContext = useFormContext()

  // [COMPUTED PROPERTIES]
  let questions, endings
  if (!formLoading && !questionsListLoading) {
    questions = questionsList.filter(
      (item) => item.questionType !== QUESTION_TYPES.ENDING
    )

    endings = questionsList.filter(
      (item) => item.questionType === QUESTION_TYPES.ENDING
    )
  }

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
    <>
      {formLoading || questionsListLoading ? (
        <Spinner />
      ) : (
        <Box bg="#f6f9fe" display="flex" height="inherit" overflowX="hidden">
          <PageLayout title={form?.title}>
            <FormContentArea
              leftSideMenu={
                <QuestionLayoutSwitcher
                  onChange={onChangeMenuItem}
                  defaultActive={activeKey}
                />
              }>
              {!!Object.keys(formContext).length && (
                <QuestionForm
                  // question={{
                  //   questionType: questionType,
                  //   layoutType: activeKey
                  // }}
                  data={formContext}
                  onQuestionTypeChange={onQuestionTypeChange}
                  showPopover={showPopover}
                  setshowPopover={setshowPopover}
                />
              )}
            </FormContentArea>
          </PageLayout>

          <EditorSidebar questions={questions} endings={endings} />
        </Box>
      )}
    </>
  )
}

FormEdit.propTypes = {}

export default FormEdit
