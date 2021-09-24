import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import { Tooltip, message } from 'antd'
import TypePopover from './TypePopover'
import useFunctions from '../../../hooks/useFunctions'
import { SidebarBoxWrapper } from './EditorSidebar.styles'
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from '../../../context/Translation'
import { QUESTION_TYPES, COLLECTIONS } from '../../../constants'
import { LAYOUT_TYPE_KEYS } from '../../../constants/layoutTypes'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { QuestionsList } from '../../../domains/Question/components'
import { Row, Col, Box, Title, Button, Divider } from '@qonsoll/react-design'
import { ModalWithFormConditionsForm } from '../../../domains/Condition/components'
import FormConditionsForm from '../../../domains/Form/components/FormConditionsForm'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from '../../../context/CurrentQuestion'

//configuration for certain types of questions
const choicesConfiguration = [
  {
    answerOptionId: uuid(),
    answerOption: 'choice 0',
    image: '',
    redirectQuestion: '',
    redirectConditionRule: ''
  }
]
const yesNoConfiguration = [
  {
    answerOptionId: uuid(),
    answerOption: 'Yes',
    redirectQuestion: '',
    redirectConditionRule: ''
  },
  {
    answerOptionId: uuid(),
    answerOption: 'No',
    redirectQuestion: '',
    redirectConditionRule: ''
  }
]
const opinionAndRatingConfiguration = Array(5)
  .fill(0)
  ?.map((_, index) => ({
    answerOptionId: uuid(),
    answerOption: 1 + index,
    redirectQuestion: '',
    redirectConditionRule: ''
  }))

const defaultConfiguration = [
  {
    answerOptionId: '',
    answerOption: '',
    redirectQuestion: '',
    redirectConditionRule: ''
  }
]
const endingConfigurations = [
  {
    answerOptionId: '',
    triggerQuestionId: ''
  }
]

function EditorSidebar(props) {
  const {
    id,
    endings,
    formData,
    questions,
    answerScoresData,
    customQuestionTypes,
    welcomeScreenShowRule
  } = props

  //[CUSTOM HOOKS]
  const { getCollectionRef, setData } = useFunctions()
  const { endingCreationTooltip, endingListTitle, questionListTitle } =
    useTranslation()

  // [ADDITIONAL HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  // const [open, setOpen] = useState(true)
  const [showPopover, setShowPopover] = useState(false)
  const [tabKey, setTabKey] = useState('1')

  // [CLEAN FUNCTIONS]
  const addQuestion = async ({ key }) => {
    const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
    //Boolean conditions
    const isChoices = [
      QUESTION_TYPES.CHOICE,
      QUESTION_TYPES.PICTURE_CHOICE
    ].includes(key)

    const isOpinionOrRating = [
      QUESTION_TYPES.OPINION_SCALE,
      QUESTION_TYPES.RATING
    ].includes(key)

    const isYesNo = key === QUESTION_TYPES.YES_NO

    //pass data to question configurations depending on question type
    const questionConfigurations = isChoices
      ? choicesConfiguration
      : isYesNo
      ? yesNoConfiguration
      : isOpinionOrRating
      ? opinionAndRatingConfiguration
      : defaultConfiguration

    const containWelcomeScreen = questions.some(
      (q) => q.questionType === QUESTION_TYPES.WELCOME_SCREEN
    )
    const isEnding = !key

    // default data for created question
    const newQuestion = {
      questionConfigurations: isEnding
        ? endingConfigurations
        : questionConfigurations,
      id: questionId,
      formId: id,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: key || QUESTION_TYPES.ENDING,
      title: '',
      order:
        key === QUESTION_TYPES.WELCOME_SCREEN
          ? 0
          : containWelcomeScreen
          ? isEnding
            ? questions?.length + endings?.length
            : questions?.length
          : isEnding
          ? questions?.length + endings?.length + 1
          : questions?.length + 1
    }

    await setData(COLLECTIONS?.QUESTIONS, newQuestion?.id, newQuestion).catch(
      (e) => message.error(e)
    )
    // set it into context as current
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: newQuestion
    })

    key && setShowPopover(!showPopover)
  }

  const popoverShowChange = () => {
    setShowPopover(!showPopover)
  }

  const onItemClick = (item) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: item
    })
  }

  const onTabChange = (key) => {
    key !== tabKey && setTabKey(key)
  }

  const onResetLogic = () => {
    questions.forEach((item) => {
      const condition = [
        QUESTION_TYPES.OPINION_SCALE,
        QUESTION_TYPES.RATING,
        QUESTION_TYPES.PICTURE_CHOICE,
        QUESTION_TYPES.CHOICE,
        QUESTION_TYPES.YES_NO
      ].includes(item.questionType)
      const newQuestionConfigs = item.questionConfigurations?.map(
        (answerConfig) => {
          const formattedObject = Object.entries(answerConfig)
          const resetFields = formattedObject?.map((tuple) => {
            if (tuple[0] === 'answerOption' && condition) {
              return tuple
            } else {
              return [tuple[0], '']
            }
          })
          return Object.fromEntries(resetFields)
        }
      )
      if (condition) {
        setData(COLLECTIONS.QUESTIONS, item.id, {
          questionConfigurations: newQuestionConfigs || []
        })
      } else {
        newQuestionConfigs?.[0] &&
          setData(COLLECTIONS.QUESTIONS, item.id, {
            questionConfigurations: [newQuestionConfigs?.[0]] || []
          })
      }
    })
  }

  const onResetEndings = () => {
    console.log('reset endings')
  }

  //[COMPUTED PROPERTIES]
  const ConditionsQuestionsList = useMemo(
    () =>
      questions
        ? questions?.filter(
            (item) =>
              ![
                QUESTION_TYPES.ENDING,
                QUESTION_TYPES.WELCOME_SCREEN,
                QUESTION_TYPES.STATEMENT
              ].includes(item.questionType)
          )
        : [],
    [questions]
  )
  const containWelcomeScreen = useMemo(
    () =>
      !!questions?.filter(
        (question) => question?.questionType === QUESTION_TYPES.WELCOME_SCREEN
      )?.length,
    [questions]
  )

  useEffect(() => {
    //when add/delete question - update endings order
    endings?.map((item, index) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        ...item,
        order: containWelcomeScreen
          ? questions?.length + index
          : questions?.length + index + 1
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions?.length])

  return (
    <SidebarBoxWrapper>
      <Row my={2} v="center" h="between">
        <Col cw="auto">
          <Title color="var(--qf-typography-title-color)" level={5}>
            {questionListTitle || 'Questions'}
          </Title>
        </Col>
        <Col display="block" cw="auto">
          <TypePopover
            questions={questions}
            onClick={addQuestion}
            showPopover={showPopover}
            setShowPopover={setShowPopover}
            popoverShowChange={popoverShowChange}
            customQuestionTypes={customQuestionTypes}
            welcomeScreenShowRule={welcomeScreenShowRule}
          />

          <ModalWithFormConditionsForm
            onResetClick={tabKey === '1' ? onResetLogic : onResetEndings}
            btnProps={{ icon: <SettingOutlined />, type: 'text' }}>
            <FormConditionsForm
              endings={endings}
              formData={formData}
              onTabChange={onTabChange}
              data={ConditionsQuestionsList}
              answerScores={answerScoresData}
            />
          </ModalWithFormConditionsForm>
        </Col>
      </Row>
      <Box overflow="auto" mb="auto">
        {!!questions?.length && (
          <QuestionsList
            data={questions}
            endings={endings}
            onItemClick={onItemClick}
          />
        )}
      </Box>

      <Divider type="horizontal" />

      <Row my={2} v="center" h="between">
        <Col cw="auto">
          <Title color="var(--qf-typography-title-color)" level={5}>
            {endingListTitle || 'Endings'}
          </Title>
        </Col>
        <Col display="block" cw="auto">
          <Tooltip
            placement="topRight"
            title={endingCreationTooltip || 'Create new ending'}>
            <Button type="text" onClick={addQuestion} icon={<PlusOutlined />} />
          </Tooltip>
        </Col>
      </Row>
      {!!endings?.length && (
        <Box overflow="auto" maxHeight="400px" minHeight="90px">
          <QuestionsList
            data={endings}
            endings={endings}
            questionsData={questions}
            onItemClick={onItemClick}
            disableDelete={endings?.length === 1}
          />
        </Box>
      )}
    </SidebarBoxWrapper>
  )
}

EditorSidebar.propTypes = {
  id: PropTypes.string,
  endings: PropTypes.array,
  formData: PropTypes.object,
  questions: PropTypes.array,
  answerScoresData: PropTypes.array,
  customQuestionTypes: PropTypes.array,
  welcomeScreenShowRule: PropTypes.bool
}

export default EditorSidebar
