import PropTypes from 'prop-types'
import { cloneElement } from 'react'
import { Typography, Button } from 'antd'
import { globalStyles } from 'app/styles'
import { Col, Row, Box } from '@qonsoll/react-design'
import { styles, StyledCard, StyledCol } from './QuestionAdvancedView.styles'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import {
  Rate,
  ShortText,
  YesnoButton,
  RangeButton,
  ChoiceButton,
  FileUploader,
  LongText,
  DateTimeInput,
  SubmitButton
} from 'components'

const { Title, Text } = Typography

function QuestionAdvancedView(props) {
  const { data, questionNumber, onClick, currentSlide } = props

  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.YES_NO]: {
      component: <YesnoButton onClick={onClick} currentSlide={currentSlide} />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: (
        <ChoiceButton
          choices={data?.btnProps}
          onClick={onClick}
          hasImages
          currentSlide={currentSlide}
        />
      )
    },
    [QUESTION_TYPES.CHOICE]: {
      component: (
        <ChoiceButton
          choices={data?.btnProps}
          onClick={onClick}
          currentSlide={currentSlide}
        />
      )
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      component: (
        <RangeButton
          from={1}
          to={5}
          onClick={onClick}
          currentSlide={currentSlide}
        />
      )
    },
    [QUESTION_TYPES.RATING]: {
      component: <Rate />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: <ShortText onClick={onClick} />
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: <LongText onClick={onClick} />
    },
    [QUESTION_TYPES.DATE]: {
      component: <DateTimeInput onClick={onClick} />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <FileUploader />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: (
        <Button size="large" type="primary" onClick={onClick}>
          Continue
        </Button>
      )
    },
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: (
        <Button
          size="large"
          buttonText="Submit"
          type="primary"
          onClick={onClick}>
          Answer questions
        </Button>
      )
    },
    [QUESTION_TYPES.ENDING]: {
      component: <SubmitButton onClick={onClick}>Finish</SubmitButton>
    }
  }
  //component for recieved question according to question type
  const component = questionTypesMap[data?.questionType].component
  const layoutType = LAYOUT_TYPES[data?.layoutType]
  //rule for template to render column with image, when layout type === left/right(small/big)
  const imageShowRule =
    layoutType.type !== LAYOUT_TYPES.BETWEEN.type &&
    layoutType.type !== LAYOUT_TYPES.FULL_SCREEN.type &&
    layoutType.type !== LAYOUT_TYPES.DEFAULT.type
  const bgImage = {
    ...(layoutType.type === LAYOUT_TYPES.FULL_SCREEN.type
      ? {
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${data?.image})`
        }
      : {})
  }

  return (
    <Row {...styles.mainRowStyle} backgroundImage={bgImage} noGutters>
      <Col {...styles.questionCardColumnStyle} cw={6}>
        <StyledCard bordered={false}>
          <Row noGutters>
            <Col cw={12}>
              <Box>
                <Title level={4} style={globalStyles.resetMargin}>
                  {questionNumber}. {data?.title}
                </Title>
              </Box>
            </Col>
          </Row>
          <Row noGutters mb={3}>
            <Col>
              <Text>{data?.subtitle}</Text>
            </Col>
          </Row>
          {layoutType.type === LAYOUT_TYPES.BETWEEN.type && (
            <Row noGutters mb={3}>
              <Col cw="auto">
                <Box
                  {...layoutType.imgSize}
                  backgroundSize="cover"
                  backgroundRepeat="no-repeat"
                  backgroundImage={`url(${data?.image})`}
                />
              </Col>
            </Row>
          )}
          <Row noGutters>
            <Col>{cloneElement(component, data)}</Col>
          </Row>
        </StyledCard>
      </Col>
      {imageShowRule && (
        <StyledCol
          {...styles.sideImageColumnStyle}
          order={layoutType.imageOrder}>
          <Box
            {...layoutType.imgSize}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundImage={`url(${data?.image})`}
          />
        </StyledCol>
      )}
    </Row>
  )
}

QuestionAdvancedView.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  questionNumber: PropTypes.number
}

export default QuestionAdvancedView
