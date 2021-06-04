import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { PageLayout, EditorSidebar, FormContentArea, Spinner } from 'components'
import { useParams } from 'react-router'
import { Box } from '@qonsoll/react-design'
import {
  QuestionForm,
  QuestionLayoutSwitcher
} from 'domains/Question/components'
import { getCollectionRef, setData } from 'app/services/Firestore'
import { QUESTION_TYPES, COLLECTIONS, DEFAULT_IMAGE } from 'app/constants'
import {
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { message } from 'antd'
import TypeformConfigurationContext from 'app/context/TypeformConfigurationContext'

function FormEdit(props) {
  const { configurations } = props

  // [ADDITIONAL HOOKS]
  const { id } = useParams()
  const [form, formLoading] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const [questionsList, questionsListLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', id)
  )

  // [CUSTOM_HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  //[COMPONENT STATE HOOKS]
  const [defaultTab, setDefaultTab] = useState(currentQuestion?.layoutType)

  // [COMPUTED PROPERTIES]
  // divide all tasks of current form into 2 groups
  const questions = useMemo(
    () =>
      questionsList
        ? questionsList?.filter(
            (item) => item.questionType !== QUESTION_TYPES.ENDING
          )
        : [],
    [questionsList]
  )
  const endings = useMemo(
    () =>
      questionsList
        ? questionsList?.filter(
            (item) => item.questionType === QUESTION_TYPES.ENDING
          )
        : [],
    [questionsList]
  )

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
    !questionsListLoading &&
      currentQuestionDispatch({
        type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
        payload: questionsList?.[0] || {}
      })
  }, [questionsListLoading])

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
    <TypeformConfigurationContext.Provider value={configurations}>
      {formLoading || questionsListLoading ? (
        <Spinner />
      ) : (
        <Box display="flex" height="inherit" overflowX="hidden">
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
                />
              )}
            </FormContentArea>
          </PageLayout>

          <EditorSidebar transparent questions={questions} endings={endings} />
        </Box>
      )}
    </TypeformConfigurationContext.Provider>
  )
}

FormEdit.propTypes = {
  configurations: PropTypes.object
}

export default FormEdit
