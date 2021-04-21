import React, { useEffect, useState, cloneElement } from 'react'
import { Typography, Card } from 'antd'
import {
  DateTimeInput,
  FileUploader,
  InputForm,
  Rate,
  TextAreaForm,
  YesnoButton,
  RangeButton,
  Button,
  ChoiceButton
} from 'app/components'
import { Col, Row, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import { styles } from './QuestionAdvancedView.styles'
import { globalStyles } from 'app/styles'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography

const choices = [
  { name: 'choice 1', image: '' },
  { name: 'choice 1', image: '' },
  { name: 'choice 1', image: '' }
]

const layoutSides = [
  LAYOUT_TYPES.LEFT_SIDE_BIG.type,
  LAYOUT_TYPES.LEFT_SIDE_SMALL.type,
  LAYOUT_TYPES.RIGHT_SIDE_BIG.type,
  LAYOUT_TYPES.RIGHT_SIDE_SMALL.type
]
const rightSide = [
  LAYOUT_TYPES.RIGHT_SIDE_BIG.type,
  LAYOUT_TYPES.RIGHT_SIDE_SMALL.type
]

function QuestionAdvancedView(props) {
  const { question, image, title, subtitle, questionNumber = 0 } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.YES_NO]: {
      component: <YesnoButton onClick={question?.btnProps?.onClick} />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: (
        <ChoiceButton choices={choices} onClick={question?.btnProps?.onClick} />
      )
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      component: (
        <RangeButton from={1} to={5} onClick={question?.btnProps?.onClick} />
      )
    },
    [QUESTION_TYPES.RATING]: {
      component: <Rate />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: <InputForm />
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: <TextAreaForm />
    },
    [QUESTION_TYPES.DATE]: {
      component: <DateTimeInput />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <FileUploader />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: (
        <Button buttonType="primary" buttonText="213" size="large">
          Continue
        </Button>
      )
    },
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: (
        <Button buttonType="primary" buttonText="Submit" size="large">
          Start questionary
        </Button>
      )
    }
  }
  const bgImage = {
    ...(question?.layoutType.type === LAYOUT_TYPES.FULL_SCREEN.type
      ? {
          //mock data will be replaced
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`
        }
      : {})
  }
  const imageOrder = rightSide.includes(question?.layoutType.type) ? 3 : 1
  // [CLEAN FUNCTIONS]

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
    <Row
      noGutters
      height="inherit"
      backgroundImage={bgImage}
      backgroundRepeat="no-repeat"
      backgroundSize="cover">
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
                {questionNumber}. {title}
              </Title>
            </Col>
          </Row>
          <Row noGutters>
            <Col>
              <Text>{subtitle}</Text>
            </Col>
          </Row>
          {question?.layoutType.type === LAYOUT_TYPES.BETWEEN.type && (
            <Row pt={25}>
              <Col cw="auto">
                <Box
                  {...question?.layoutType.imgSize}
                  //mock data will be replaced
                  backgroundRepeat="no-repeat"
                  backgroundImage={`url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`}
                />
              </Col>
            </Row>
          )}
          <Row noGutters pt={25}>
            <Col>
              {cloneElement(
                questionTypesMap[question?.questionType].component,
                question
              )}
            </Col>
          </Row>
        </Card>
      </Col>
      {layoutSides.includes(question?.layoutType.type) && (
        <Col
          v="center"
          display="flex"
          style={styles.columnStyle}
          height="100%"
          order={imageOrder}>
          <Box
            {...question?.layoutType.imgSize}
            backgroundRepeat="no-repeat"
            backgroundImage={`url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`}
          />
        </Col>
      )}
    </Row>
  )
}

QuestionAdvancedView.propTypes = {}

export default QuestionAdvancedView
