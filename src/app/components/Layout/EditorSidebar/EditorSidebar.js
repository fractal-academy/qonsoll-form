import { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { globalStyles } from 'app/styles'
import { Row, Col, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES, COLLECTIONS } from 'app/constants'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
import { Typography, Divider, message, Button, Popover } from 'antd'
import { SidebarStateSwitcher, styles } from './EditorSidebar.styles'
import { ModalWithFormConditionsForm } from 'domains/Condition/components'
import FormConditionsForm from 'domains/Form/components/FormConditionsForm'
import { QuestionTypeSelect, QuestionsList } from 'domains/Question/components'
import { getCollectionRef, setData, deleteData } from 'app/services/Firestore'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'
import {
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  SettingOutlined
} from '@ant-design/icons'

const { Title } = Typography

function EditorSidebar(props) {
  const { questions, endings } = props

  // [ADDITIONAL HOOKS]
  const { id } = useParams()
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
      btnProps: key === QUESTION_TYPES.CHOICE ? [{ name: '', image: '' }] : ''
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
        <Box {...styles.sidebarBoxWrapper}>
          <Box p={3}>
            <Row noGutters>
              <Col v="center">
                <Title level={5} style={globalStyles.resetMargin}>
                  Questions
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
                  content={<QuestionTypeSelect onClick={addQuestion} />}>
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
          <Box overflow="auto" p={3}>
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
                <Divider type="horizontal" style={globalStyles.resetMargin} />
              </Col>
            </Row>
            <Row h="center" mt={1}>
              <Col cw="auto">
                <Box {...styles.dragbleCeiling} />
              </Col>
            </Row>
            <Row p={3}>
              <Col v="center">
                <Title level={5} style={globalStyles.resetMargin}>
                  Endings
                </Title>
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
              {/*<QuestionsList />*/}
              {!!endings?.length && (
                <QuestionsList
                  firstElement={questions?.length}
                  setNewOrder={setNewOrder}
                  onItemClick={onItemClick}
                  data={endings}
                />
              )}
            </Box>
          </Box>
        </Box>
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
