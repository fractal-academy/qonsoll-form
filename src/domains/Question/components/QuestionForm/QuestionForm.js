import PropTypes from 'prop-types'
import React, { cloneElement, useEffect } from 'react'
import { Col, Row, Box, Text } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import { StyledTag } from './QuestionForm.styles'

import SideLayoutImage from './SideLayoutImage'
import MiddleLayoutImage from './MiddleLayoutImage'
import QuestionLayoutSwitcher from '../QuestionLayoutSwitcher'

import {
  TEXTINGS,
  LAYOUT_TYPES,
  DEFAULT_IMAGE,
  QUESTION_TYPES
} from '../../../../constants'
import {
  QuestionHeader,
  QuestionMediaPopover,
  // QuestionImageContainer,
  QuestionConfigurationPopover
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

  console.log(questionData)

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
        <Box display="flex" fontWeight="500" m={2}>
          {/* MOVE TO CONSTANTS */}
          Here will be answer as video. ;)
        </Box>
      )
    }
  }

  const computedMediaUrl = currentQuestion?.image || DEFAULT_IMAGE
  const tagRule = questionData?.questionType !== QUESTION_TYPES.WELCOME_SCREEN
  const url = `url(${computedMediaUrl})`
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
  const video = questionData?.isVideoQuestion
  const configButtonPlacementRule = [
    LAYOUT_TYPES.FULL_SCREEN.type,
    LAYOUT_TYPES.RIGHT_SIDE_BIG.type,
    LAYOUT_TYPES.RIGHT_SIDE_SMALL.type
  ].includes(layoutType?.type)

  useEffect(() => {
    setBrightnessValue(currentQuestion.imageBrightness || 0)
  }, [currentQuestion, setBrightnessValue])

  return (
    <ContentCard
      image={bgImage}
      brightnessValue={questionData?.brightnessValue || brightnessValue}
      leftSideMenu={
        !!Object.keys(currentQuestion).length && (
          <QuestionLayoutSwitcher
            disabled={video}
            defaultActive={defaultTab}
            onChange={onQuestionLayoutChange}
          />
        )
      }>
      {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
        <Box position="absolute" right={0} mr={4}>
          <QuestionMediaPopover
            MediaModalButtonBackground={url}
            setBrightnessValue={setBrightnessValue}
            brightnessValue={questionData?.brightnessValue || brightnessValue}
          />
        </Box>
      )}
      <Row noGutters height="100%" h="center" position="relative">
        {isConfigurationPopoverVisible && (
          <Box
            mx={4}
            position="absolute"
            left={configButtonPlacementRule && 0}
            right={!configButtonPlacementRule && 0}>
            <QuestionConfigurationPopover
              questionData={questionData}
              questionsList={questionsList}
              customQuestionTypes={customQuestionTypes}
              onQuestionTypeChange={onQuestionTypeChange}
              welcomeScreenShowRule={welcomeScreenShowRule}
            />
          </Box>
        )}

        {imageShowRule && (
          <Col cw={4} order={layoutType?.imageOrder}>
            <SideLayoutImage
              url={url}
              layoutType={layoutType}
              brightness={brightnessValue}
              setBrightness={setBrightnessValue}
            />
          </Col>
        )}

        <Col cw={video ? 11 : 8} order={2}>
          <Row
            noGutters
            v="center"
            h="center"
            width="100%"
            height="100%"
            flexDirection={questionData?.isVideoQuestion ? 'row' : 'column'}>
            <Col cw={questionData?.isVideoQuestion ? 5 : 11} mb={4}>
              <Box mb={2}>
                {tagRule && <StyledTag>{questionTag}</StyledTag>}
              </Box>
              <QuestionHeader
                tagRule={tagRule}
                questionTag={questionTag}
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
            {layoutType?.type === LAYOUT_TYPES.BETWEEN.type &&
              !questionData?.isVideoQuestion && (
                <Col cw="auto">
                  <MiddleLayoutImage
                    url={url}
                    layoutType={layoutType}
                    brightness={brightnessValue}
                    setBrightness={setBrightnessValue}
                  />
                </Col>
              )}
            <Col ml={video && 2} cw={questionData?.isVideoQuestion ? 6 : 11}>
              {cloneElement(
                questionTypesMap[questionData?.questionType].component,
                {
                  question: questionData
                }
              )}
            </Col>
          </Row>
        </Col>
      </Row>
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

/* {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
        <Box position="absolute" right="48px">
          <QuestionMediaPopover
            brightnessValue={questionData?.brightnessValue || brightnessValue}
            setBrightnessValue={setBrightnessValue}
            MediaModalButtonBackground={popoverImage}
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
              <Box>
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
                {layoutType?.type === LAYOUT_TYPES.BETWEEN.type &&
                  !questionData?.isVideoQuestion && (
                    <Row noGutters>
                      <Col cw="auto" flexDirection="end">
                        <QuestionImageContainer
                          {...layoutType.imgSize}
                          mb={4}
                          image={computedMediaUrl}
                          style={{
                            filter: `brightness(${
                              questionData?.brightnessValue + 100 ||
                              brightnessValue + 100
                            }%)`
                          }}>
                          <Box display="flex" justifyContent="flex-end" mr={4}>
                            <QuestionMediaPopover
                              brightnessValue={brightnessValue}
                              setBrightnessValue={setBrightnessValue}
                              MediaModalButtonBackground={popoverImage}
                            />
                          </Box>
                        </QuestionImageContainer>
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
              </Box>
            </CustomCard>
          </Col>
          {imageShowRule && (
            <StyledCol
              order={layoutType?.imageOrder}
              {...styles.sideImageColumnStyle}>
              <QuestionImageContainer
                layoutType={layoutType?.type}
                {...layoutType?.imgSize}
                image={computedMediaUrl}
                style={{ filter: `brightness(${brightnessValue + 100}%)` }}>
                <Row h="right">
                  <Col cw="auto" mr={4}>
                    <QuestionMediaPopover
                      brightnessValue={brightnessValue}
                      setBrightnessValue={setBrightnessValue}
                      MediaModalButtonBackground={popoverImage}
                    />
                  </Col>
                </Row>
              </QuestionImageContainer>
            </StyledCol>
          )}
        </CustomRow>
      )} */
