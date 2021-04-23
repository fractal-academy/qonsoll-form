import React, { useEffect, useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Typography, Divider } from 'antd'
import {
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { styles } from './EditorSidebar.styles'
import { globalStyles } from 'app/styles'
import PropTypes from 'prop-types'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'
import { Popover } from 'components'
import FormConditionsForm from 'domains/Form/components/FormConditionsForm'
import ModalWithFormConditionsForm from 'domains/Condition/combined/ModalWithFormConditionsForm'
import QuestionsList from 'domains/Question/components/QuestionsList'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
import { QUESTION_TYPES, COLLECTIONS } from 'app/constants'
import {
  addData,
  firestore,
  getCollectionRef,
  setData
} from 'app/services/Firestore'
import { useParams } from 'react-router'
import DISPATCH_EVENTS from 'app/context/FormContext/DispatchEventsTypes'
import { useFormContextDispatch } from 'app/context/FormContext'
// import { useTranslation } from 'react-i18next'
const { Title } = Typography

function EditorSidebar(props) {
  const { questions, endings, setCurrentQuestion } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const { id } = useParams()
  const dispatch = useFormContextDispatch()
  // [COMPONENT STATE HOOKS]
  const [open, setOpen] = useState(true)
  const [showPopover, setshowPopover] = useState(false)

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

  const addEnding = async () => {
    const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
    const newEnding = {
      id: questionId,
      formId: id,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: QUESTION_TYPES.ENDING,
      title: 'New Ending.'
    }
    dispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: newEnding
    })
    await setData(COLLECTIONS.QUESTIONS, questionId, newEnding)
    // setEndingsList((endingsList) => [...endingsList, newEnding])
  }
  const addQuestion = async ({ key }) => {
    const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
    const newQuestion = {
      id: questionId,
      formId: id,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: key,
      title: 'New Question.'
    }
    dispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: newQuestion
    })
    await setData(COLLECTIONS.QUESTIONS, questionId, newQuestion)
    // setQuestionsList((questionsList) => [...questionsList, newQuestion])
    setshowPopover(!showPopover)
  }
  const popoverShowChange = () => {
    setshowPopover(!showPopover)
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
    <Box position="relative" display="flex">
      <Box
        position="absolute"
        bg="white"
        borderRadius="0 0 0 8px"
        style={styles.siderStateSwitcherStyle}
        onClick={() => {
          setOpen(!open)
        }}>
        {open ? (
          <RightOutlined style={styles.siderStateSwithcerIcon} />
        ) : (
          <LeftOutlined style={styles.siderStateSwithcerIcon} />
        )}
      </Box>
      {open && (
        <Box
          bg="white"
          width="300px"
          display="flex"
          flexDirection="column"
          position="relative">
          <Box p={3}>
            <Row display="flex" flex={1}>
              <Col v="center">
                <Title level={5} style={globalStyles.resetMargin}>
                  Questions
                </Title>
              </Col>
              <Col cw="auto" px={10} py={1} mr={2} borderRadius="4px">
                <Popover
                  onClick={popoverShowChange}
                  visible={showPopover}
                  onVisibleChange={() => {
                    setshowPopover(!showPopover)
                  }}
                  trigger={'click'}
                  placement={'bottomRight'}
                  btnType="text"
                  btnIcon={<PlusOutlined style={styles.hover} />}
                  content={<QuestionTypeSelect onClick={addQuestion} />}
                />
              </Col>
              <Col cw="auto" px={1} borderRadius="4px" v="center">
                <ModalWithFormConditionsForm
                  btnProps={{ icon: <SettingOutlined />, type: 'text' }}>
                  <FormConditionsForm />
                </ModalWithFormConditionsForm>
              </Col>
            </Row>
          </Box>
          {/* Question List*/}
          <Box overflow="auto" p={3}>
            {questions?.length && <QuestionsList data={questions} />}
          </Box>
          <Box mt="auto" style={styles.endingsPosition}>
            <Row>
              <Col>
                <Divider type="horizontal" style={globalStyles.resetMargin} />
              </Col>
            </Row>
            <Row h="center" mt={1} style={globalStyles.cursorGrab}>
              <Col cw="auto">
                <Box
                  height="3px"
                  bg="#282c34"
                  width="50px"
                  borderRadius="8px"
                />
              </Col>
            </Row>
            <Row p={3}>
              <Col v="center">
                <Title level={5} style={globalStyles.resetMargin}>
                  Endings
                </Title>
              </Col>
              <Col cw="auto" px={10} py={1} borderRadius="4px" bg="#e8f0fb">
                <PlusOutlined
                  style={styles.plusIconColor}
                  onClick={addEnding}
                />
              </Col>
            </Row>
            <Box pb={3} px={3} maxHeight="350px" overflow="auto">
              {/*<QuestionsList />*/}
              {endings?.length && <QuestionsList data={endings} />}
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
