import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Typography, Button, Popover } from 'antd'
import { QUESTION_TYPES, COLLECTIONS } from '../../../constants'
import { LAYOUT_TYPE_KEYS } from '../../../constants/layoutTypes'
import { ModalWithFormConditionsForm } from '../../../domains/Condition/components'
import FormConditionsForm from '../../../domains/Form/components/FormConditionsForm'
import {
  QuestionTypeSelect,
  QuestionsList
} from '../../../domains/Question/components'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from '../../../context/CurrentQuestion'
import {
  CustomDivider,
  SidebarBoxWrapper,
  styles
} from './EditorSidebar.styles'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import useFunctions from '../../../hooks/useFunctions'
import { PopoverNegativeMarin } from '../../../../styles/NegativeMargin'
import { useTranslation } from '../../../context/Translation'

const { Title } = Typography

function EditorSidebar(props) {
  const {
    questions,
    endings,
    id,
    showCondition,
    transparent,
    customQuestionTypes
  } = props

  //[CUSTOM HOOKS]
  const { getCollectionRef, setData } = useFunctions()
  const { editorSidebarEndingsTitle, editorSidebarQuestionsTitle } =
    useTranslation()

  // [ADDITIONAL HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  // const [open, setOpen] = useState(true)
  const [showPopover, setshowPopover] = useState(false)

  // [CLEAN FUNCTIONS]
  const addQuestion = async ({ key }) => {
    const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
    //Bolean conditions
    const isChoices = [
      QUESTION_TYPES.CHOICE,
      QUESTION_TYPES.PICTURE_CHOICE
    ].includes(key)

    const isOpinionOrRating = [
      QUESTION_TYPES.OPINION_SCALE,
      QUESTION_TYPES.RATING
    ].includes(key)

    const isYesNo = key === QUESTION_TYPES.YES_NO

    //configuration for certain types of questions
    const choicesConfiguration = [
      {
        answerOption: 'default',
        image: '',
        redirectQuestion: ''
      }
    ]
    const yesNoConfiguration = [
      {
        answerOption: 'Yes',
        redirectQuestion: ''
      },
      {
        answerOption: 'No',
        redirectQuestion: ''
      }
    ]
    const opinionAndRatingConfiguration = Array(5 - 1 + 1)
      .fill(0)
      .map((el, index) => ({ answerOption: 1 + index, redirectQuestion: '' }))

    //pass data to question configurations depending on question type
    const questionConfigurations = isChoices
      ? choicesConfiguration
      : isYesNo
      ? yesNoConfiguration
      : isOpinionOrRating
      ? opinionAndRatingConfiguration
      : ''

    // default data for created question
    const newQuestion = {
      questionConfigurations,
      id: questionId,
      formId: id,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: key || QUESTION_TYPES.ENDING,
      title: '',
      order: questions?.length
    }

    // set it into context as current
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: newQuestion
    })
    key && setshowPopover(!showPopover)
  }

  const popoverShowChange = () => {
    setshowPopover(!showPopover)
  }

  const onItemClick = (item) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: item
    })
  }

  useEffect(() => {
    endings?.map((item, index) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        ...item,
        order: questions?.length + index
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions?.length])

  return (
    <Box position="relative" display="flex">
      {/* <SidebarStateSwitcher
        onClick={() => {
          setOpen(!open)
        }}>
        {open ? <RightOutlined /> : <LeftOutlined />}
      </SidebarStateSwitcher> */}
      {/* {open && ( */}
      <SidebarBoxWrapper transparent={transparent} my={4}>
        <Box p={3}>
          <Row noGutters>
            <Col v="center">
              <Title level={5}>
                {editorSidebarQuestionsTitle || 'Questions'}
              </Title>
            </Col>
            <Col cw="auto">
              <Popover
                visible={showPopover}
                onVisibleChange={() => {
                  setshowPopover(!showPopover)
                }}
                trigger={'click'}
                placement={'bottomRight'}
                content={
                  <Box my={PopoverNegativeMarin.v} mx={PopoverNegativeMarin.h}>
                    <QuestionTypeSelect
                      onClick={addQuestion}
                      customQuestionTypes={customQuestionTypes}
                    />
                  </Box>
                }>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={popoverShowChange}
                />
              </Popover>
            </Col>

            <Col cw="auto" v="center" px={1}>
              <ModalWithFormConditionsForm
                btnProps={{ icon: <SettingOutlined />, type: 'text' }}>
                <FormConditionsForm data={questions} />
              </ModalWithFormConditionsForm>
            </Col>
          </Row>
        </Box>
        {/* Question List*/}
        <Box overflow="auto" pr={2}>
          {!!questions?.length && (
            <QuestionsList data={questions} onItemClick={onItemClick} />
          )}
        </Box>
        <Box mt="auto">
          <Row>
            <Col>
              <CustomDivider type="horizontal" />
            </Col>
          </Row>
          <Row p={3}>
            <Col v="center">
              <Title level={5}>{editorSidebarEndingsTitle || 'Endings'}</Title>
            </Col>
            <Col cw="auto">
              <Button
                disabled={endings.length >= 1}
                type="text"
                icon={<PlusOutlined />}
                onClick={addQuestion}
              />
            </Col>
          </Row>
          <Box {...styles.endingsList}>
            {!!endings?.length && (
              <QuestionsList
                data={endings}
                onItemClick={onItemClick}
                disableDelete={!!endings?.length}
              />
            )}
          </Box>
        </Box>
      </SidebarBoxWrapper>
      {/* )} */}
    </Box>
  )
}

EditorSidebar.defaultProps = {
  questionsList: 'Questions list',
  questionsEndingsList: 'Question endings list'
}

EditorSidebar.propTypes = {
  questionsList: PropTypes.node.isRequired,
  questionsEndingsList: PropTypes.node.isRequired
}

export default EditorSidebar
