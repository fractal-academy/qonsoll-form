import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import {
  PageLayout,
  EditorSidebar,
  FormContentArea,
  Spinner
} from '../../../../components'
import { Box } from '@qonsoll/react-design'
import {
  QuestionForm,
  QuestionLayoutSwitcher
} from '../../../../domains/Question/components'
import {
  QUESTION_TYPES,
  COLLECTIONS,
  DEFAULT_IMAGE
} from '../../../../constants'
import {
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from '../../../../context/CurrentQuestion'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { message } from 'antd'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import useFunctions from '../../../../hooks/useFunctions'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'

function FormEdit(props) {
  const { firebase, actions, id } = props
  // [CUSTOM_HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const { getCollectionRef, setData } = useFunctions(firebase)
  // [ADDITIONAL HOOKS]
  const [form, formLoading] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const [questionsList, questionsListLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', id)
  )

  //[COMPONENT STATE HOOKS]
  const [defaultTab, setDefaultTab] = useState(currentQuestion?.layoutType)

  // [COMPUTED PROPERTIES]
  // divide all tasks of current form into 2 groups
  let questions = [],
    endings = []
  if (!formLoading && !questionsListLoading) {
    questionsList.forEach((item) => {
      item.questionType !== QUESTION_TYPES.ENDING
        ? questions.push(item)
        : endings.push(item)
    })
  }

  // [CLEAN FUNCTIONS]
  const onChangeMenuItem = ({ key }) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        layoutType: key,
        image: currentQuestion?.image || DEFAULT_IMAGE
      }
    })
  }
  const onQuestionTypeChange = async ({ key }) => {
    //when we change question type on choice or picture choice - set default choice, else empty field
    const isChoices = [
      QUESTION_TYPES.CHOICE,
      QUESTION_TYPES.PICTURE_CHOICE
    ].includes(key)
    const questionConfigurations = isChoices
      ? [{ name: 'default', image: '' }]
      : ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionType: key, questionConfigurations }
    })
  }

  // [USE_EFFECTS]
  useEffect(() => {
    //set default active tab for questionLayout switcher every time when we change current question
    setDefaultTab(currentQuestion?.layoutType)
    //save data of current question to database, when it change
    !!Object.keys(currentQuestion).length &&
      setData(
        COLLECTIONS.QUESTIONS,
        currentQuestion?.id,
        currentQuestion
      ).catch((e) => message.error(e.message))
  }, [currentQuestion])

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        {formLoading || questionsListLoading ? (
          <Spinner />
        ) : (
          <Box display="flex" height="inherit" overflowX="hidden">
            <PageLayout title={form?.title} id={id}>
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
                  />
                )}
              </FormContentArea>
            </PageLayout>

            <EditorSidebar questions={questions} endings={endings} id={id} />
          </Box>
        )}
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormEdit.propTypes = {
  firebase: PropTypes.object
}

export default FormEdit
