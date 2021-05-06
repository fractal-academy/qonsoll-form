import { Typography, Switch } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES } from 'app/constants'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'
import {
  OpinionScaleCustomConfig,
  RatingCustomConfig
} from './QuestionCustomConfigurations'

const { Text } = Typography

function QuestionConfigurationMenu(props) {
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]

  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  // [COMPONENT STATE HOOKS]

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const requireStateChange = (switchValue) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { isRequired: switchValue }
    })
  }

  return (
    <Box py={2}>
      <Row mb={3} noGutters>
        <Col>
          <Text>Required</Text>
        </Col>
        <Col cw="auto">
          <Switch size="small" onChange={requireStateChange} />
        </Col>
      </Row>
      {currentQuestion.questionType === QUESTION_TYPES.OPINION_SCALE && (
        <Row noGutters>
          <Col>
            <OpinionScaleCustomConfig />
          </Col>
        </Row>
      )}
      {currentQuestion.questionType === QUESTION_TYPES.RATING && (
        <Row noGutters>
          <Col>
            <RatingCustomConfig />
          </Col>
        </Row>
      )}
    </Box>
  )
}

export default QuestionConfigurationMenu
