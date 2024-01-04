import {
  ChoiceEditableGroup,
  ContentCard,
  DateTimeInput,
  FileUploader,
  LongText,
  RangeButton,
  Rate,
  ShortText,
  SubmitButton,
  YesnoButton
} from '../../../../components'
import { Col, Row, Typography } from 'antd'
import {
  CustomCard,
  CustomRow,
  StyledCol,
  StyledTag,
  styles
} from './QuestionForm.styles'
import {
  DEFAULT_IMAGE,
  LAYOUT_TYPES,
  QUESTION_TYPES
} from '../../../../constants'
import {
  QuestionConfigurationPopover,
  QuestionHeader,
  QuestionMediaPopover
} from '../../../../domains/Question/components'
import React, { cloneElement, useEffect } from 'react'

import MiddleLayoutImage from './MiddleLayoutImage'
import PropTypes from 'prop-types'
import QuestionLayoutSwitcher from '../QuestionLayoutSwitcher'
import SideLayoutImage from './SideLayoutImage'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import { useTranslations } from '@qonsoll/translation'

const { Text } = Typography

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
  const { t } = useTranslations()
  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: <SubmitButton>{t('Start')}</SubmitButton>
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
      component: <SubmitButton>{t('Finish')}</SubmitButton>
    },
    [QUESTION_TYPES.VIDEO_ANSWER]: {
      component: (
        <Text type="secondary" my="24px">{`${t(
          'Here will be answer as video'
        )}. ;)`}</Text>
      )
    }
  }

  const computedMediaUrl = currentQuestion?.image || DEFAULT_IMAGE
  const tagRule = questionData?.questionType !== QUESTION_TYPES.WELCOME_SCREEN
  const url = `url(${computedMediaUrl})`
  const video = questionData?.isVideoQuestion
  const questionTag =
    currentQuestion.questionType === QUESTION_TYPES.ENDING
      ? t('Ending')
      : `${t('Question')} ${questionData?.order}`
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
      }
    >
      {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
        <div position="absolute" right="24px">
          <QuestionMediaPopover
            brightnessValue={questionData?.brightnessValue || brightnessValue}
            setBrightnessValue={setBrightnessValue}
            MediaModalButtonBackground={url}
          />
        </div>
      )}
      {!!Object.keys(currentQuestion).length && (
        <CustomRow noGutters>
          <Col {...styles.questionCardColumnStyle} cw={[12, 10, 10, 8]} px="0">
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
              <Row noGutters h="between">
                <Col cw="12" mt="24px">
                  <QuestionHeader
                    titlePlaceholder={t('Editable question title')}
                    subtitlePlaceholder={t('Description (optional)')}
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
              <div>
                {cloneElement(
                  questionTypesMap[questionData?.questionType].component,
                  {
                    question: questionData
                  }
                )}
              </div>
            </CustomCard>
          </Col>
          {imageShowRule && (
            <StyledCol
              order={layoutType?.imageOrder}
              {...styles.sideImageColumnStyle}
            >
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
  defaultTab: PropTypes.string,
  questionsList: PropTypes.array,
  brightnessValue: PropTypes.number,
  setBrightnessValue: PropTypes.func,
  customQuestionTypes: PropTypes.array,
  welcomeScreenShowRule: PropTypes.bool,
  onQuestionLayoutChange: PropTypes.func
}

export default QuestionForm
