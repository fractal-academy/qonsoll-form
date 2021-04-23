import PropTypes from 'prop-types'
import { cloneElement } from 'react'
import { Typography, Card } from 'antd'
import { globalStyles } from 'app/styles'
import { Col, Row, Box } from '@qonsoll/react-design'
import { styles } from './QuestionAdvancedView.styles'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import {
  Rate,
  Button,
  InputForm,
  YesnoButton,
  RangeButton,
  ChoiceButton,
  FileUploader,
  TextAreaForm,
  DateTimeInput
} from 'app/components'

const { Title, Text } = Typography

const choices = [
  {
    name: 'choice 1',
    image:
      'https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg'
  },
  {
    name: 'choice 1',
    image:
      'https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg'
  },
  {
    name: 'choice 1',
    image:
      'https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg'
  }
]

function QuestionAdvancedView(props) {
  const { data, questionNumber, onClick } = props

  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.YES_NO]: {
      component: <YesnoButton onClick={onClick} />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: <ChoiceButton choices={choices} onClick={onClick} />
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      component: <RangeButton from={1} to={5} onClick={onClick} />
    },
    [QUESTION_TYPES.RATING]: {
      component: <Rate />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: <InputForm onClick={onClick} />
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: <TextAreaForm onClick={onClick} />
    },
    [QUESTION_TYPES.DATE]: {
      component: <DateTimeInput />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <FileUploader />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: (
        <Button
          size="large"
          buttonText="213"
          buttonType="primary"
          onClick={onClick}>
          Continue
        </Button>
      )
    },
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: (
        <Button
          size="large"
          buttonText="Submit"
          buttonType="primary"
          onClick={onClick}>
          Start questionary
        </Button>
      )
    }
  }

  const layoutTypeMap = {
    FULL_SCREEN: { constant: LAYOUT_TYPES.FULL_SCREEN, imageOrder: '' },
    BETWEEN: { constant: LAYOUT_TYPES.BETWEEN, imageOrder: '' },
    LEFT_SIDE_SMALL: { constant: LAYOUT_TYPES.LEFT_SIDE_SMALL, imageOrder: 1 },
    LEFT_SIDE_BIG: { constant: LAYOUT_TYPES.LEFT_SIDE_BIG, imageOrder: 1 },
    RIGHT_SIDE_SMALL: {
      constant: LAYOUT_TYPES.RIGHT_SIDE_SMALL,
      imageOrder: 3
    },
    RIGHT_SIDE_BIG: { constant: LAYOUT_TYPES.RIGHT_SIDE_BIG, imageOrder: 3 }
  }

  const layoutType = data?.layoutType && layoutTypeMap[data.layoutType].constant
  const imageOrder =
    data?.layoutType && layoutTypeMap[data.layoutType].imageOrder

  const bgImage = {
    ...(layoutType.type === LAYOUT_TYPES.FULL_SCREEN.type
      ? {
          //mock data will be replaced
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`
        }
      : {})
  }

  const imageShowRule =
    layoutType.type !== LAYOUT_TYPES.BETWEEN.type &&
    layoutType.type !== LAYOUT_TYPES.FULL_SCREEN.type

  return (
    <Row
      noGutters
      height="inherit"
      backgroundSize="cover"
      backgroundImage={bgImage}
      backgroundRepeat="no-repeat">
      <Col
        v="center"
        order={2}
        mx={4}
        display="flex"
        style={styles.columnStyle}>
        <Card bordered={false} style={styles.cardStyle}>
          <Row noGutters>
            <Col cw="auto">
              <Title level={4} style={globalStyles.resetMargin}>
                {questionNumber}. {data?.title}
              </Title>
            </Col>
          </Row>
          <Row noGutters>
            <Col>
              <Text>{data?.subtitle}</Text>
            </Col>
          </Row>
          {layoutType.type === LAYOUT_TYPES.BETWEEN.type && (
            <Row pt={25}>
              <Col cw="auto">
                <Box
                  {...layoutType.imgSize}
                  //mock data will be replaced
                  backgroundRepeat="no-repeat"
                  backgroundImage={`url(${data?.image})`}
                />
              </Col>
            </Row>
          )}
          <Row noGutters pt={25}>
            <Col>
              {cloneElement(
                questionTypesMap[data?.questionType].component,
                data
              )}
            </Col>
          </Row>
        </Card>
      </Col>
      {imageShowRule && (
        <Col
          v="center"
          display="flex"
          style={styles.columnStyle}
          height="100%"
          order={imageOrder}>
          <Box
            {...layoutType.imgSize}
            backgroundRepeat="no-repeat"
            backgroundImage={`url(${data?.image})`}
          />
        </Col>
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
