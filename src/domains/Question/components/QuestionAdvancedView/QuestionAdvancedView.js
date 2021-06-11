import PropTypes from 'prop-types'
import { Typography } from 'antd'
import React, { cloneElement } from 'react'
import { Col, Row, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES, LAYOUT_TYPES } from '../../../../constants'
import { useTranslation } from '../../../../context/Translation'
import {
  styles,
  StyledCard,
  StyledCol,
  MainRow
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
import QuestionImageContainer from '../QuestionImageContainer'


const { Title, Text } = Typography

function QuestionAdvancedView(props) {
  const { data, questionNumber, onClick, currentSlide, submitLoading } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslation()

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
      component: <Rate onClick={onClick} />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: <ShortText onClick={onClick} />
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: <LongText onClick={onClick} />
    },
    [QUESTION_TYPES.DATE]: {
      component: <DateTimeInput onDateChange={onClick} />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <FileUploader onContinue={onClick} />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: <SubmitButton onClick={onClick}>Continue</SubmitButton>
    },
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: <SubmitButton onClick={onClick}>{t('Start')}</SubmitButton>
    },
    [QUESTION_TYPES.ENDING]: {
      component: (
        <SubmitButton onClick={onClick} finish loading={submitLoading}>
          {t('Finish')}
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

  return (
    <Row {...styles.mainRowStyle} backgroundImage={bgImage} noGutters>
      <Col {...styles.questionCardColumnStyle} cw={6}>
        <StyledCard bordered={false} specialLayoutRule={specialLayoutRule}>
          <Row noGutters>
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
                />
              </Col>
            </Row>
          )}
          <Box>{cloneElement(component, { question: data })}</Box>
        </StyledCard>
      </Col>
      {imageShowRule && (
        <StyledCol
          {...styles.sideImageColumnStyle}
          order={layoutType.imageOrder}>
          <QuestionImageContainer {...layoutType.imgSize} image={data?.image} />
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
