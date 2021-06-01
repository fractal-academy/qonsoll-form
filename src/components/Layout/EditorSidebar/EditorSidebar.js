import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Typography, message, Button, Popover } from 'antd'
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
  SidebarStateSwitcher,
  styles
} from './EditorSidebar.styles'
import {
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  SettingOutlined
} from '@ant-design/icons'
import useFunctions from '../../../hooks/useFunctions'
import { PopoverNegativeMarin } from '../../../../styles/NegativeMargin'

const { Title } = Typography

function EditorSidebar(props) {
  const { questions, endings, id, showCondition } = props
  const { getCollectionRef, setData, deleteData } = useFunctions()
  // [ADDITIONAL HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  const [open, setOpen] = useState(true)
  const [showPopover, setshowPopover] = useState(false)

  // [CLEAN FUNCTIONS]
  const handleDelete = async (questionId) => {
    await deleteData(COLLECTIONS.QUESTIONS, questionId)
      .catch((e) => message.error(e.message))
      .then(updateQuestionOrder())
  }
  const updateQuestionOrder = async () => {
    questions.forEach((item, index) =>
      setData(COLLECTIONS.QUESTIONS, item.id, {
        order: index
      })
    )
  }
  const addQuestion = async ({ key }) => {
    const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
    // default data for created question
    const newQuestion = {
      id: questionId,
      formId: id,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: key || QUESTION_TYPES.ENDING,
      title: '',
      //fix lettering later, as will added logic jumps
      order: (key && questions?.length) || String.fromCharCode(65),
      questionConfigurations:
        key === QUESTION_TYPES.CHOICE ? [{ name: '', image: '' }] : ''
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
  const setNewOrder = (item) => {
    setData(COLLECTIONS.QUESTIONS, item?.id, item).catch((e) =>
      message.error(e.message)
    )
  }
  const onItemClick = (item) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: item
    })
  }

  return (
    <Box position="relative" display="flex">
      <SidebarStateSwitcher
        onClick={() => {
          setOpen(!open)
        }}>
        {open ? <RightOutlined /> : <LeftOutlined />}
      </SidebarStateSwitcher>
      {open && (
        <SidebarBoxWrapper>
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
                    <Box
                      my={PopoverNegativeMarin.v}
                      mx={PopoverNegativeMarin.h}>
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
              {showCondition && (
                <Col cw="auto" v="center" px={1}>
                  <ModalWithFormConditionsForm
                    btnProps={{ icon: <SettingOutlined />, type: 'text' }}>
                    <FormConditionsForm />
                  </ModalWithFormConditionsForm>
                </Col>
              )}
            </Row>
          </Box>
          {/* Question List*/}
          <Box overflow="auto" pr={3}>
            {!!questions?.length && (
              <QuestionsList
                action={handleDelete}
                setNewOrder={setNewOrder}
                onItemClick={onItemClick}
                data={questions}
              />
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
                <QuestionsList
                  action={handleDelete}
                  setNewOrder={setNewOrder}
                  onItemClick={onItemClick}
                  data={endings}
                />
              )}
            </Box>
          </Box>
        </SidebarBoxWrapper>
      )}
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
