import useMedia from 'use-media'
import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import QuestionImageContainer from '../QuestionImageContainer'
import { useTranslation } from '../../../../context/Translation'
import { Col, Row, Box, Title, Text } from '@qonsoll/react-design'
import { QUESTION_TYPES, LAYOUT_TYPES, TEXTINGS } from '../../../../constants'
import {
  styles,
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
  SubmitButton,
  VideoPlayer,
  VideoAnswer
} from '../../../../components'

function QuestionAdvancedView(props) {
  const {
    data,
    onClick,
    isFormQuiz,
    currentSlide,
    submitLoading,
    questionNumber,
    answersScoreData,
    preventFirebaseUsage
  } = props
  // [ADDITIONAL_HOOKS]
  const { questionFinishButton, questionStartButton, questionVideo } =
    useTranslation()

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
      component: (
        <RangeButton onKeyDown onClick={onClick} currentSlide={currentSlide} />
      )
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
    [QUESTION_TYPES.VIDEO_ANSWER]: {
      component: <VideoAnswer onClick={onClick} />
    },
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: (
        <SubmitButton onClick={onClick} currentSlide={currentSlide}>
          {questionStartButton || TEXTINGS.questionStartButton}
        </SubmitButton>
      )
    },
    [QUESTION_TYPES.ENDING]: {
      component: (
        <SubmitButton
          finish
          onClick={onClick}
          submitLoading={submitLoading}
          currentSlide={currentSlide}
          preventFirebaseUsage={preventFirebaseUsage}>
          {questionFinishButton || TEXTINGS.questionFinishButton}
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
  const backgroundRule = layoutType.type === LAYOUT_TYPES.FULL_SCREEN.type
  const bgImage = {
    ...(layoutType.type === LAYOUT_TYPES.FULL_SCREEN.type
      ? {
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${data?.image})`
        }
      : {})
  }
  const widthTablet = useMedia({ maxWidth: '832px' })
  const deviceImageHeight = (widthTablet && '40%') || '100%'
  const devicePadding = (widthTablet && 2) || 4

  const tabletImageCheck = widthTablet
    ? imageShowRule
      ? 'start'
      : 'center'
    : 'center'

  const questionNumberRule =
    data?.questionType !== QUESTION_TYPES.WELCOME_SCREEN

  return (
    <Row {...styles.mainRowStyle} noGutters>
      {backgroundRule && (
        <BackgroundImage
          cw={12}
          image={bgImage}
          imageBrightness={data?.imageBrightness || 0}
        />
      )}
      <Col mx={2} order={2} cw={[12, 12, 6, 6]} alignSelf={tabletImageCheck}>
        <StyledBox
          pl={devicePadding}
          pr={devicePadding}
          bordered={false}
          specialLayoutRule={specialLayoutRule}>
          <Row noGutters py={2} width="100%">
            <Col cw={12}>
              {data?.isVideoQuestion ? (
                <Box
                  height={350}
                  position="relative"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center">
                  {questionNumberRule && (
                    <Title
                      color="var(--qf-typography-title-color)"
                      style={{ wordBreak: 'break-word' }}
                      level={4}>
                      {questionNumber}.{questionVideo || TEXTINGS.questionVideo}
                    </Title>
                  )}
                  <VideoPlayer
                    autoLoad
                    videoKey={data?.videoApiKey}
                    autoStart="false"
                    customOptions={{
                      autoplay: false
                    }}
                  />
                </Box>
              ) : (
                <Title
                  color="var(--qf-typography-title-color)"
                  style={{ wordBreak: 'break-word' }}
                  level={4}>
                  {questionNumberRule && `${questionNumber}.`} {data?.title}
                </Title>
              )}
            </Col>
          </Row>
          <Row noGutters mb={3}>
            <Col>
              <Text color="var(--qf-typography-subtitle-color)">
                {data?.subtitle}
              </Text>
            </Col>
          </Row>
          {layoutType.type === LAYOUT_TYPES.BETWEEN.type && (
            <Row noGutters mb={3} h={widthTablet && 'center'}>
              <Col cw="auto">
                <QuestionImageContainer
                  layoutType={layoutType?.type}
                  widthTablet={widthTablet}
                  {...layoutType.imgSize}
                  image={data?.image}
                  imageBrightness={data?.imageBrightness || 0}
                />
              </Col>
            </Row>
          )}
          <Box>
            {cloneElement(component, {
              question: data,
              answersScoreData,
              isFormQuiz
            })}
          </Box>
        </StyledBox>
      </Col>
      {imageShowRule && (
        <Col
          v="center"
          h="center"
          height={deviceImageHeight}
          order={widthTablet ? '1' : layoutType.imageOrder}>
          <QuestionImageContainer
            image={data?.image}
            layoutType={layoutType?.type}
            widthTablet={widthTablet}
            {...layoutType.imgSize}
            imageBrightness={data?.imageBrightness || 0}
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
