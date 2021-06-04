import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Typography, Button, Popover } from 'antd'
import { QUESTION_TYPES, COLLECTIONS } from 'app/constants'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
import { ModalWithFormConditionsForm } from 'domains/Condition/components'
import FormConditionsForm from 'domains/Form/components/FormConditionsForm'
import { getCollectionRef } from 'app/services/Firestore'
import { QuestionTypeSelect, QuestionsList } from 'domains/Question/components'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'
import {
  CustomDivider,
  SidebarBoxWrapper,
  styles
} from './EditorSidebar.styles'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { PopoverNegativeMarin } from 'app/styles/NegativeMargin'

const { Title } = Typography

function EditorSidebar(props) {
  const { questions, endings, transparent } = props

  // [ADDITIONAL HOOKS]
  const { id } = useParams()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  // const [open, setOpen] = useState(true)
  const [showPopover, setshowPopover] = useState(false)

  // [CLEAN FUNCTIONS]

  const addQuestion = async ({ key }) => {
    const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
    const isChoices = [
      QUESTION_TYPES.CHOICE,
      QUESTION_TYPES.PICTURE_CHOICE
    ].includes(key)
    const questionConfigurations = isChoices
      ? [{ name: 'default', image: '' }]
      : ''
    // default data for created question
    const newQuestion = {
      id: questionId,
      formId: id,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: key || QUESTION_TYPES.ENDING,
      title: '',
      order: questions?.length,
      questionConfigurations: questionConfigurations
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
              <Title level={5}>Questions</Title>
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
                    <QuestionTypeSelect onClick={addQuestion} />
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
                <FormConditionsForm />
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
              <Title level={5}>Endings</Title>
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
              <QuestionsList data={endings} onItemClick={onItemClick} />
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
