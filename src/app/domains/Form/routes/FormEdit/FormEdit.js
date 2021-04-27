import { useState } from 'react'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea,
  Spinner
} from 'components'
import { useParams } from 'react-router'
import { Box } from '@qonsoll/react-design'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
import { QuestionForm } from 'app/domains/Question/components'
import { getCollectionRef, setData } from 'app/services/Firestore'
import DISPATCH_EVENTS from 'app/context/FormContext/DispatchEventsTypes'
import { QUESTION_TYPES, COLLECTIONS, DEFAULT_IMAGE } from 'app/constants'
import { useFormContext, useFormContextDispatch } from 'app/context/FormContext'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

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
  const currentQuestion = useFormContext()
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
  console.log(questions)
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
                    defaultActive={LAYOUT_TYPE_KEYS[0]}
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
