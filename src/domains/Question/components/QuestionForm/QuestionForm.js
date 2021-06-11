import { Tag } from 'antd'
import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import {
  DEFAULT_IMAGE,
  QUESTION_TYPES,
  LAYOUT_TYPES
} from '../../../../constants'
import { Col, Row, Box } from '@qonsoll/react-design'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import { useTranslation } from '../../../../context/Translation'
import QuestionLayoutSwitcher from '../QuestionLayoutSwitcher'
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
import styled from 'styled-components'

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.color.primary.t.lighten5};
  color: ${({ theme }) => theme.color.primary.default};
  border-color: ${({ theme }) => theme.color.primary.t.lighten2};
`

function QuestionForm(props) {
  const {
    data,
    defaultTab,
    brightnessValue,
    onChangeMenuItem,
    setBrightnessValue,
    customQuestionTypes,
    onQuestionTypeChange
  } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslation()
  const currentQuestion = useCurrentQuestionContext()

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
      component: <DateTimeInput disabled />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <FileUploader disabled />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: <SubmitButton>{t('Next')}</SubmitButton>
    },
    [QUESTION_TYPES.ENDING]: {
      component: <SubmitButton>{t('Finish')}</SubmitButton>
    }
  }

  const computedMediaUrl = currentQuestion?.image || DEFAULT_IMAGE
  const popoverImage = `url(${computedMediaUrl})`
  const questionTag =
    currentQuestion.questionType === QUESTION_TYPES.ENDING
      ? t('Ending')
      : `${t('Question')} ${data?.order + 1}`
  const layoutType = LAYOUT_TYPES[data?.layoutType]
  //rule for template to render column with image, when layout type === left/right(small/big)
  const imageShowRule =
    layoutType?.type !== LAYOUT_TYPES.BETWEEN.type &&
    layoutType?.type !== LAYOUT_TYPES.FULL_SCREEN.type &&
    layoutType?.type !== LAYOUT_TYPES.DEFAULT.type
  const bgImage =
    layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && computedMediaUrl

  return (
    <ContentCard
      onEdit
      image={bgImage}
      brightnessValue={brightnessValue}
      leftSideMenu={
        !!Object.keys(currentQuestion).length && (
          <QuestionLayoutSwitcher
            onChange={onChangeMenuItem}
            defaultActive={defaultTab}
          />
        )
      }>
      {!!Object.keys(currentQuestion).length && (
        <CustomRow noGutters>
          <Col {...styles.questionCardColumnStyle} cw={[12, 12, 10, 6]}>
            <CustomCard bordered={false}>
              <Row noGutters v="center">
                <Col>
                  <StyledTag>{questionTag}</StyledTag>
                </Col>
                <Col cw="auto">
                  <QuestionConfigurationPopover
                    customQuestionTypes={customQuestionTypes}
                    onQuestionTypeChange={onQuestionTypeChange}
                  />
                </Col>
                {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
                  <Col cw="auto" ml={2}>
                    <QuestionMediaPopover
                      brightnessValue={brightnessValue}
                      setBrightnessValue={setBrightnessValue}
                      MediaModalButtonBackground={popoverImage}
                    />
                  </Col>
                )}
              </Row>
              <Row noGutters h="between" mb={4}>
                <QuestionHeaderCol cw="12">
                  <QuestionHeader
                    titlePlaceholder={'Editable question title'}
                    subtitlePlaceholder={'Description(optional)'}
                  />
                </QuestionHeaderCol>
              </Row>
              {layoutType?.type === LAYOUT_TYPES.BETWEEN.type && (
                <Row noGutters>
                  <Col cw="auto">
                    <QuestionImageContainer
                      {...layoutType.imgSize}
                      mb={4}
                      image={computedMediaUrl}
                      style={{ filter: `brightness(${brightnessValue}%)` }}>
                      <QuestionMediaPopover
                        brightnessValue={brightnessValue}
                        setBrightnessValue={setBrightnessValue}
                        MediaModalButtonBackground={popoverImage}
                      />
                    </QuestionImageContainer>
                  </Col>
                </Row>
              )}
              <Box>
                {cloneElement(questionTypesMap[data?.questionType].component, {
                  question: data
                })}
              </Box>
            </CustomCard>
          </Col>
          {imageShowRule && (
            <StyledCol
              order={layoutType?.imageOrder}
              {...styles.sideImageColumnStyle}>
              <QuestionImageContainer
                {...layoutType?.imgSize}
                image={computedMediaUrl}
                style={{ filter: `brightness(${brightnessValue}%)` }}>
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
  data: PropTypes.object,
  onQuestionTypeChange: PropTypes.func,
  setShowPopover: PropTypes.func,
  showPopover: PropTypes.bool,
  setIsImageEditVisible: PropTypes.func,
  isImageEditVisible: PropTypes.bool
}

export default QuestionForm
