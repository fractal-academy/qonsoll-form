import { Tag } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React, { cloneElement, useEffect } from 'react'
import { Col, Row, Box } from '@qonsoll/react-design'
import QuestionLayoutSwitcher from '../QuestionLayoutSwitcher'
import { useTranslation } from '../../../../context/Translation'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import {
  DEFAULT_IMAGE,
  QUESTION_TYPES,
  LAYOUT_TYPES
} from '../../../../constants'
import {
  styles,
  StyledCol,
  CustomCard,
  CustomRow,
  QuestionHeaderCol
} from './QuestionForm.styles'
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

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.color.primary.t.lighten5};
  color: ${({ theme }) => theme.color.primary.default};
  border-color: ${({ theme }) => theme.color.primary.t.lighten2};
`

function QuestionForm(props) {
  const {
    defaultTab,
    questionData,
    questionsList,
    brightnessValue,
    onChangeMenuItem,
    setBrightnessValue,
    customQuestionTypes,
    onQuestionTypeChange,
    welcomeScreenShowRule
  } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const {
    startButton,
    finishButton,
    endingQuestion,
    commonQuestion,
    editableTitleHint,
    editableSubtitleHint
  } = useTranslation()
  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: <SubmitButton>{startButton || 'Start'}</SubmitButton>
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
      component: <SubmitButton>{finishButton || 'Finish'}</SubmitButton>
    }
  }

  const computedMediaUrl = currentQuestion?.image || DEFAULT_IMAGE
  const tagRule = questionData?.questionType !== QUESTION_TYPES.WELCOME_SCREEN
  const popoverImage = `url(${computedMediaUrl})`
  const questionTag =
    currentQuestion.questionType === QUESTION_TYPES.ENDING
      ? endingQuestion || 'Ending'
      : `${commonQuestion || 'Question'} ${questionData?.order}`
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
            onChange={onChangeMenuItem}
            defaultActive={defaultTab}
          />
        )
      }>
      {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
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
          <Col {...styles.questionCardColumnStyle} cw={[12, 12, 10, 8]}>
            <CustomCard bordered={false}>
              <Row noGutters v="center">
                <Col>{tagRule && <StyledTag>{questionTag}</StyledTag>}</Col>
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
                <QuestionHeaderCol cw="12" mt={2}>
                  <QuestionHeader
                    titlePlaceholder={
                      editableTitleHint || 'Editable question title'
                    }
                    subtitlePlaceholder={
                      editableSubtitleHint || 'Description(optional)'
                    }
                  />
                </QuestionHeaderCol>
              </Row>
              {layoutType?.type === LAYOUT_TYPES.BETWEEN.type && (
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
