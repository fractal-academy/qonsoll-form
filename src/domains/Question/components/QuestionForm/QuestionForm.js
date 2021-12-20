import PropTypes from 'prop-types'
import React, { cloneElement, useEffect } from 'react'
import { Col, Row, Box } from '@qonsoll/react-design'
import SideLayoutImage from './SideLayoutImage'
import MiddleLayoutImage from './MiddleLayoutImage'
import QuestionLayoutSwitcher from '../QuestionLayoutSwitcher'
import { useTranslation } from '../../../../context/Translation'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import {
  styles,
  StyledCol,
  CustomCard,
  CustomRow,
  StyledTag
} from './QuestionForm.styles'
import {
  TEXTINGS,
  LAYOUT_TYPES,
  DEFAULT_IMAGE,
  QUESTION_TYPES
} from '../../../../constants'
import {
  QuestionConfigurationPopover,
  QuestionHeader,
  QuestionMediaPopover,
  QuestionImageContainer
} from '../../../../domains/Question/components'
import {
  Rate,
  ShortText,
  ChoiceEditableGroup,
  YesnoButton,
  RangeButton,
  SubmitButton,
  FileUploader,
  LongText,
  DateTimeInput,
  ContentCard
} from '../../../../components'

function QuestionForm(props) {
  const {
    defaultTab,
    questionData,
    questionsList,
    brightnessValue,
    setBrightnessValue,
    customQuestionTypes,
    onQuestionTypeChange,
    welcomeScreenShowRule,
    onQuestionLayoutChange
  } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const {
    questionStartButton,
    questionFinishButton,
    endingListTitle,
    questionListTitle,
    questionEditableTitleHint,
    questionEditableSubtitleHint
  } = useTranslation()
  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: (
        <SubmitButton>
          {questionStartButton || TEXTINGS.questionStartButton}
        </SubmitButton>
      )
    },
    [QUESTION_TYPES.YES_NO]: {
      component: <YesnoButton />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: <ChoiceEditableGroup withImage />
    },
    [QUESTION_TYPES.CHOICE]: {
      component: <ChoiceEditableGroup />
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      component: <RangeButton />
    },
    [QUESTION_TYPES.RATING]: {
      component: <Rate />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: <ShortText />
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: <LongText />
    },
    [QUESTION_TYPES.DATE]: {
      component: <DateTimeInput />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <FileUploader />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: <SubmitButton />
    },
    [QUESTION_TYPES.ENDING]: {
      component: (
        <SubmitButton>
          {questionFinishButton || TEXTINGS.questionFinishButton}
        </SubmitButton>
      )
    },
    [QUESTION_TYPES.VIDEO_ANSWER]: {
      component: (
        <Box
          m={2}
          height="100%"
          display="flex"
          fontWeight="500"
          alignItems="center">
          {/* MOVE TO CONSTANTS */}
          Here will be answer as video. ;)
        </Box>
      )
    }
  }

  const computedMediaUrl = currentQuestion?.image || DEFAULT_IMAGE
  const tagRule = questionData?.questionType !== QUESTION_TYPES.WELCOME_SCREEN
  const url = `url(${computedMediaUrl})`
  const video = questionData?.isVideoQuestion
  const questionTag =
    currentQuestion.questionType === QUESTION_TYPES.ENDING
      ? endingListTitle || TEXTINGS.endingListTitle
      : `${questionListTitle || TEXTINGS.questionListTitle} ${
          questionData?.order
        }`
  const layoutType = LAYOUT_TYPES[questionData?.layoutType]
  //rule for template to render column with image, when layout type === left/right(small/big)
  const imageShowRule =
    layoutType?.type !== LAYOUT_TYPES.BETWEEN.type &&
    layoutType?.type !== LAYOUT_TYPES.FULL_SCREEN.type &&
    layoutType?.type !== LAYOUT_TYPES.DEFAULT.type
  const bgImage =
    layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && computedMediaUrl
  const isConfigurationPopoverVisible = !(
    currentQuestion.questionType === QUESTION_TYPES.ENDING
  )

  useEffect(() => {
    setBrightnessValue(currentQuestion.imageBrightness || 0)
  }, [currentQuestion, setBrightnessValue])

  return (
    <ContentCard
      onEdit
      image={bgImage}
      brightnessValue={questionData?.brightnessValue || brightnessValue}
      leftSideMenu={
        !!Object.keys(currentQuestion).length && (
          <QuestionLayoutSwitcher
            onChange={onQuestionLayoutChange}
            defaultActive={defaultTab}
            disabled={video}
          />
        )
      }>
      {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
        <Box position="absolute" right="48px">
          <QuestionMediaPopover
            brightnessValue={questionData?.brightnessValue || brightnessValue}
            setBrightnessValue={setBrightnessValue}
            MediaModalButtonBackground={url}
          />
        </Box>
      )}
      {!!Object.keys(currentQuestion).length && (
        <CustomRow noGutters>
          <Col {...styles.questionCardColumnStyle} cw={[12, 12, 10, 8]} px="0">
            <CustomCard bordered={false}>
              <Row noGutters v="center" h="between">
                <Col cw="auto">
                  {tagRule && <StyledTag>{questionTag}</StyledTag>}
                </Col>
                {isConfigurationPopoverVisible && (
                  <Col cw="auto">
                    <QuestionConfigurationPopover
                      questionData={questionData}
                      welcomeScreenShowRule={welcomeScreenShowRule}
                      questionsList={questionsList}
                      customQuestionTypes={customQuestionTypes}
                      onQuestionTypeChange={onQuestionTypeChange}
                    />
                  </Col>
                )}
              </Row>
              <Row noGutters h="between" mb={4}>
                <Col cw="12" mt={2}>
                  <QuestionHeader
                    titlePlaceholder={
                      questionEditableTitleHint ||
                      TEXTINGS.questionEditableTitleHint
                    }
                    subtitlePlaceholder={
                      questionEditableSubtitleHint ||
                      TEXTINGS.questionEditableSubtitleHint
                    }
                  />
                </Col>
              </Row>
              {layoutType?.type === LAYOUT_TYPES.BETWEEN.type && (
                <Row noGutters>
                  <Col cw="auto" flexDirection="end">
                    <MiddleLayoutImage
                      url={url}
                      layoutType={layoutType}
                      brightness={brightnessValue}
                      setBrightness={setBrightnessValue}
                    />
                  </Col>
                </Row>
              )}
              <Box>
                {cloneElement(
                  questionTypesMap[questionData?.questionType].component,
                  {
                    question: questionData
                  }
                )}
              </Box>
            </CustomCard>
          </Col>
          {imageShowRule && (
            <StyledCol
              order={layoutType?.imageOrder}
              {...styles.sideImageColumnStyle}>
              <SideLayoutImage
                url={url}
                layoutType={layoutType}
                brightness={brightnessValue}
                setBrightness={setBrightnessValue}
              />
            </StyledCol>
          )}
        </CustomRow>
      )}
    </ContentCard>
  )
}

QuestionForm.propTypes = {
  questionData: PropTypes.object,
  onQuestionTypeChange: PropTypes.func,
  setShowPopover: PropTypes.func,
  showPopover: PropTypes.bool,
  setIsImageEditVisible: PropTypes.func,
  isImageEditVisible: PropTypes.bool
}

export default QuestionForm
