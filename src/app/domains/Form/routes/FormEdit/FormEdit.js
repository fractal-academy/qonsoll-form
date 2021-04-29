import { useState, useEffect } from 'react'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea,
  Spinner
} from 'components'
import { useParams } from 'react-router'
import { Box } from '@qonsoll/react-design'
import { QuestionForm } from 'app/domains/Question/components'
import { getCollectionRef, setData } from 'app/services/Firestore'
import DISPATCH_EVENTS from 'app/context/FormContext/DispatchEventsTypes'
import { QUESTION_TYPES, COLLECTIONS, DEFAULT_IMAGE } from 'app/constants'
import { useFormContext, useFormContextDispatch } from 'app/context/FormContext'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

function FormEdit() {
  // [ADDITIONAL HOOKS]
  const { id } = useParams()
  const [form, formLoading] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const [questionsList, questionsListLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', id)
  )
  // [CUSTOM HOOKS]
  const currentQuestion = useFormContext()
  const dispatch = useFormContextDispatch()

  //[COMPONENT STATE HOOKS]
  const [isImageEditVisible, setIsImageEditVisible] = useState(false)
  const [showPopover, setShowPopover] = useState(false)
  const [defaultTab, setDefaultTab] = useState(currentQuestion?.layoutType)

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
  const onChangeMenuItem = async ({ key }) => {
    dispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        layoutType: key,
        image: currentQuestion?.image || DEFAULT_IMAGE
      }
    })
    await setData(COLLECTIONS.QUESTIONS, currentQuestion?.id, {
      ...currentQuestion,
      layoutType: key,
      image: currentQuestion?.image || DEFAULT_IMAGE
    })
  }
  const onQuestionTypeChange = async ({ key }) => {
    await dispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionType: key }
    })
    await setData(COLLECTIONS.QUESTIONS, currentQuestion?.id, {
      ...currentQuestion,
      questionType: key
    })
    setShowPopover(false)
  }

  //[USE EFFECTS]
  useEffect(() => {
    setDefaultTab(currentQuestion?.layoutType)
  }, [currentQuestion])

  return (
    <>
      {formLoading || questionsListLoading ? (
        <Spinner />
      ) : (
        <Box bg="#f6f9fe" display="flex" height="inherit" overflowX="hidden">
          <PageLayout title={form?.title}>
            <FormContentArea
              leftSideMenu={
                !!Object.keys(currentQuestion).length && (
                  <QuestionLayoutSwitcher
                    onChange={onChangeMenuItem}
                    defaultActive={defaultTab}
                  />
                )
              }>
              {!!Object.keys(currentQuestion).length && (
                <QuestionForm
                  data={currentQuestion}
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
