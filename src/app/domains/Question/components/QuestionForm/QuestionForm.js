import { Tag } from 'antd'
import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import { DEFAULT_IMAGE } from 'app/constants'
import { Col, Row, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import {
  styles,
  StyledCol,
  CustomCard,
  CustomRow,
  CustomCol
} from './QuestionForm.styles'
import { useCurrentQuestionContext } from 'app/context/CurrentQuestion'
import {
  QuestionConfigurationPopover,
  QuestionHeader,
  QuestionMediaPopover
} from 'domains/Question/components'
import {
  Rate,
  ShortText,
  ChoiceEditableGroup,
  YesnoButton,
  RangeButton,
  SubmitButton,
  FileUploader,
  LongText,
  DateTimeInput
} from 'components'

function QuestionForm(props) {
  const { data, onQuestionTypeChange } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()

  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: <SubmitButton>Start</SubmitButton>
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
      component: <FileUploader />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: <SubmitButton>Next</SubmitButton>
    },
    [QUESTION_TYPES.ENDING]: {
      component: <SubmitButton>Finish</SubmitButton>
    }
  }

  const computedMediaUrl = `url(${currentQuestion?.image || DEFAULT_IMAGE})`
  const questionTag =
    currentQuestion.questionType === QUESTION_TYPES.ENDING
      ? 'Ending'
      : `Question ${data?.order + 1}`
  const layoutType = LAYOUT_TYPES[data?.layoutType]
  //rule for template to render column with image, when layout type === left/right(small/big)
  const imageShowRule =
    layoutType?.type !== LAYOUT_TYPES.BETWEEN.type &&
    layoutType?.type !== LAYOUT_TYPES.FULL_SCREEN.type &&
    layoutType?.type !== LAYOUT_TYPES.DEFAULT.type
  const bgImage =
    layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && computedMediaUrl

  return (
    <CustomRow noGutters backgroundImage={bgImage}>
      <Col {...styles.questionCardColumnStyle} cw={6}>
        <CustomCard bordered={false}>
          <Row noGutters v="center">
            <Col>
              <Tag color="blue">{questionTag}</Tag>
            </Col>
            <Col cw="auto">
              <QuestionConfigurationPopover
                onQuestionTypeChange={onQuestionTypeChange}
              />
            </Col>
            {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
              <Col cw="auto" ml={2}>
                <QuestionMediaPopover
                  MediaModalButtonBackground={computedMediaUrl}
                />
              </Col>
            )}
          </Row>
          <Row noGutters h="between" mb={4}>
            <CustomCol cw="12">
              <QuestionHeader
                titlePlaceholder={'Editable question title'}
                subtitlePlaceholder={'Description(optional)'}
              />
            </CustomCol>
          </Row>
          {layoutType?.type === LAYOUT_TYPES.BETWEEN.type && (
            <Row noGutters>
              <Col cw="auto">
                <Box
                  {...layoutType.imgSize}
                  {...styles.imageBetweenStyle}
                  backgroundImage={computedMediaUrl}>
                  <QuestionMediaPopover
                    MediaModalButtonBackground={computedMediaUrl}
                  />
                </Box>
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
          <Box
            {...styles.sideImageBoxStyle}
            {...layoutType?.imgSize}
            backgroundImage={computedMediaUrl}>
            <Row h="right">
              <Col cw="auto" mr={4}>
                <QuestionMediaPopover
                  MediaModalButtonBackground={computedMediaUrl}
                />
              </Col>
            </Row>
          </Box>
        </StyledCol>
      )}
    </CustomRow>
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
