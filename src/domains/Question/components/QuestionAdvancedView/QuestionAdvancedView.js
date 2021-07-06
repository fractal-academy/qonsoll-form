import useMedia from 'use-media'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import { Col, Row, Box } from '@qonsoll/react-design'
import QuestionImageContainer from '../QuestionImageContainer'
import { useTranslation } from '../../../../context/Translation'
import { QUESTION_TYPES, LAYOUT_TYPES } from '../../../../constants'
import {
  styles,
  StyledCol,
  StyledBox,
  BackgroundImage
} from './QuestionAdvancedView.styles'
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
} from '../../../../components'

const { Title, Text } = Typography

function QuestionAdvancedView(props) {
  const { data, questionNumber, onClick, currentSlide, submitLoading } = props

  // [ADDITIONAL_HOOKS]
  const { finishButton, startButton } = useTranslation()

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
      component: <SubmitButton onClick={onClick} currentSlide={currentSlide} />
    },
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: (
        <SubmitButton onClick={onClick} currentSlide={currentSlide}>
          {finishButton || 'Start'}
        </SubmitButton>
      )
    },
    [QUESTION_TYPES.ENDING]: {
      component: (
        <SubmitButton
          onClick={onClick}
          currentSlide={currentSlide}
          finish
          loading={submitLoading}>
          {startButton || 'Finish'}
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
  const questionNumberRule =
    data?.questionType !== QUESTION_TYPES.WELCOME_SCREEN

  return (
    <Row {...styles.mainRowStyle} noGutters>
      {bgImage && (
        <BackgroundImage
          cw={12}
          image={bgImage}
          imageBrightness={data?.imageBrightness || 0}
        />
      )}
      <Col {...styles.questionCardColumnStyle} cw={[12, 12, 6, 6]}>
        <StyledBox
          pl={devicePadding}
          bordered={false}
          specialLayoutRule={specialLayoutRule}>
          <Row noGutters py={2}>
            <Col cw={12}>
              <Title style={{ wordBreak: 'break-word' }} level={4}>
                {questionNumberRule && `${questionNumber}.`} {data?.title}
              </Title>
            </Col>
          </Row>
          <Row noGutters mb={3}>
            <Col>
              <Text>{data?.subtitle}</Text>
            </Col>
          </Row>
          {layoutType.type === LAYOUT_TYPES.BETWEEN.type && (
            <Row noGutters mb={3} h={heightSmallDevices && 'center'}>
              <Col cw="auto">
                <QuestionImageContainer
                  layoutType={layoutType?.type}
                  heightSmallDevices={heightSmallDevices}
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
            layoutType={layoutType?.type}
            heightSmallDevices={heightSmallDevices}
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
