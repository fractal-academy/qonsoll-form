import PropTypes from 'prop-types'
import { Typography } from 'antd'
import React, { cloneElement } from 'react'
import { Col, Row, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import { styles, StyledCol, StyledBox } from './QuestionAdvancedView.styles'
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
import QuestionImageContainer from '../QuestionImageContainer'
import useMedia from 'use-media'

const { Title, Text } = Typography

function QuestionAdvancedView(props) {
  const { data, questionNumber, onClick, currentSlide } = props

  console.log(data?.imageBrightness, data?.image)

  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.YES_NO]: {
      component: <YesnoButton onClick={onClick} currentSlide={currentSlide} />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: (
        <ChoiceButton
          choices={data?.questionConfigurations}
          onClick={onClick}
          currentSlide={currentSlide}
          hasImages
        />
      )
    },
    [QUESTION_TYPES.CHOICE]: {
      component: (
        <ChoiceButton
          choices={data?.questionConfigurations}
          onClick={onClick}
          currentSlide={currentSlide}
        />
      )
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      component: <RangeButton onClick={onClick} currentSlide={currentSlide} />
    },
    [QUESTION_TYPES.RATING]: {
      component: <Rate onClick={onClick} currentSlide={currentSlide} />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: <ShortText onClick={onClick} currentSlide={currentSlide} />
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: <LongText onClick={onClick} currentSlide={currentSlide} />
    },
    [QUESTION_TYPES.DATE]: {
      component: (
        <DateTimeInput onDateChange={onClick} currentSlide={currentSlide} />
      )
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: (
        <FileUploader onContinue={onClick} currentSlide={currentSlide} />
      )
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: (
        <SubmitButton onClick={onClick} currentSlide={currentSlide}>
          Continue
        </SubmitButton>
      )
    },
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: (
        <SubmitButton onClick={onClick} currentSlide={currentSlide}>
          Start
        </SubmitButton>
      )
    },
    [QUESTION_TYPES.ENDING]: {
      component: (
        <SubmitButton onClick={onClick} currentSlide={currentSlide} finish>
          Finish
        </SubmitButton>
      )
    }
  }
  //component for recieved question according to question type
  const component = questionTypesMap[data?.questionType].component
  const layoutType = LAYOUT_TYPES[data?.layoutType]

  // defines special question layouts
  const specialLayoutRule =
    data?.questionType === QUESTION_TYPES.WELCOME_SCREEN ||
    data?.questionType === QUESTION_TYPES.ENDING

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
  const heightSmallDevices = useMedia({ maxWidth: '768px' })
  const deviceImageHeight = (heightSmallDevices && '40%') || '100%'
  const devicePadding = (heightSmallDevices && 2) || 4

  return (
    <Row {...styles.mainRowStyle} backgroundImage={bgImage} noGutters>
      <Col {...styles.questionCardColumnStyle} cw={[12, 12, 6, 6]}>
        <StyledBox
          pl={devicePadding}
          bordered={false}
          specialLayoutRule={specialLayoutRule}>
          <Row noGutters py={2}>
            <Col cw={12}>
              <Title level={4}>
                {questionNumber}. {data?.title}
              </Title>
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
                <QuestionImageContainer
                  {...layoutType.imgSize}
                  image={data?.image}
                  imageBrightness={data?.imageBrightness || 0}
                />
              </Col>
            </Row>
          )}
          <Box>{cloneElement(component, { question: data })}</Box>
        </StyledBox>
      </Col>
      {imageShowRule && (
        <StyledCol
          height={deviceImageHeight}
          {...styles.sideImageColumnStyle}
          order={heightSmallDevices ? '1' : layoutType.imageOrder}>
          <QuestionImageContainer
            image={data?.image}
            {...layoutType.imgSize}
            imageBrightness={data?.imageBrightness || 0}
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
