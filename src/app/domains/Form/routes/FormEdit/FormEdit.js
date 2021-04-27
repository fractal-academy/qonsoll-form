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
import { QUESTION_TYPES, COLLECTIONS, DEFAULT_IMAGE } from 'app/constants'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
import { useFormContext, useFormContextDispatch } from 'app/context/FormContext'
import DISPATCH_EVENTS from 'app/context/FormContext/DispatchEventsTypes'
import { useParams } from 'react-router'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { getCollectionRef } from 'app/services/Firestore'

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
  const [isImageEditVisible, setIsImageEditVisible] = useState(false)
  const [showPopover, setShowPopover] = useState(false)

  // [CUSTOM_HOOKS]
  const formContext = useFormContext()
  const dispatch = useFormContextDispatch()

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
    dispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        layoutType: key,
        image: formContext?.image || DEFAULT_IMAGE
      }
    })
  }
  const onQuestionTypeChange = ({ key }) => {
    dispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionType: key }
    })
    setShowPopover(false)
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
                !!Object.keys(formContext).length && (
                  <QuestionLayoutSwitcher
                    onChange={onChangeMenuItem}
                    defaultActive={LAYOUT_TYPE_KEYS[0]}
                  />
                )
              }>
              {!!Object.keys(formContext).length && (
                <QuestionForm
                  data={formContext}
                  onQuestionTypeChange={onQuestionTypeChange}
                  showPopover={showPopover}
                  setShowPopover={setShowPopover}
                  isImageEditVisible={isImageEditVisible}
                  setIsImageEditVisible={setIsImageEditVisible}
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
