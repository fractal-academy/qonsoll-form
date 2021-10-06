import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Box, Text } from '@qonsoll/react-design'
import { QUESTION_TYPES, QUESTION_DESCRIPTIONS } from '../../../../constants'
import { useTranslation } from '../../../../context/Translation'
import {
  QuestionsTypeMenu,
  QuestionMenuItem
} from './QuestionTypeSelect.styles'
import {
  CalendarOutlined,
  CopyrightOutlined,
  FileTextOutlined,
  GoldOutlined,
  HomeOutlined,
  PictureOutlined,
  ShareAltOutlined,
  SmallDashOutlined,
  StarOutlined,
  UploadOutlined
} from '@ant-design/icons'

function QuestionTypeSelect(props) {
  const {
    //  questionData,
    onClick,
    welcomeScreenShowRule,
    customQuestionTypes
  } = props

  // [ADDITIONAL_HOOKS]
  const {
    welcomeScreenTitle,
    longTextTitle,
    shortTextTitle,
    dateTitle,
    yesnoTitle,
    choiceTitle,
    pictureChoiceTitle,
    opinionTitle,
    ratingTitle,
    fileUploadTitle,
    statementTitle,
    welcomeScreenDesc,
    longTextDesc,
    shortTextDesc,
    dateDesc,
    fileUploadDesc,
    opinionDesc,
    pictureChoiceDesc,
    choiceDesc,
    ratingDesc,
    statementDesc,
    yesnoDesc
  } = useTranslation()

  // [COMPUTED_PROPERTIES]
  const questionTypeMap = customQuestionTypes || [
    {
      type: welcomeScreenTitle || QUESTION_TYPES.WELCOME_SCREEN,
      description: welcomeScreenDesc || QUESTION_DESCRIPTIONS.WELCOME_SCREEN,
      icon: <HomeOutlined />
    },
    {
      type: longTextTitle || QUESTION_TYPES.LONG_TEXT,
      description: longTextDesc || QUESTION_DESCRIPTIONS.LONG_TEXT,
      icon: <FileTextOutlined />
    },
    {
      type: shortTextTitle || QUESTION_TYPES.SHORT_TEXT,
      description: shortTextDesc || QUESTION_DESCRIPTIONS.SHORT_TEXT,
      icon: <SmallDashOutlined />
    },
    {
      type: dateTitle || QUESTION_TYPES.DATE,
      description: dateDesc || QUESTION_DESCRIPTIONS.DATE,
      icon: <CalendarOutlined />
    },
    {
      type: yesnoTitle || QUESTION_TYPES.YES_NO,
      description: yesnoDesc || QUESTION_DESCRIPTIONS.YES_NO,
      icon: <ShareAltOutlined />
    },
    {
      type: choiceTitle || QUESTION_TYPES.CHOICE,
      description: choiceDesc || QUESTION_DESCRIPTIONS.CHOICE,
      icon: <GoldOutlined />
    },
    {
      type: pictureChoiceTitle || QUESTION_TYPES.PICTURE_CHOICE,
      description: pictureChoiceDesc || QUESTION_DESCRIPTIONS.PICTURE_CHOICE,
      icon: <PictureOutlined />
    },
    {
      type: opinionTitle || QUESTION_TYPES.OPINION_SCALE,
      description: opinionDesc || QUESTION_DESCRIPTIONS.OPINION_SCALE,
      icon: <HomeOutlined />
    },
    {
      type: ratingTitle || QUESTION_TYPES.RATING,
      description: ratingDesc || QUESTION_DESCRIPTIONS.RATING,
      icon: <StarOutlined />
    },
    {
      type: fileUploadTitle || QUESTION_TYPES.FILE_UPLOAD,
      description: fileUploadDesc || QUESTION_DESCRIPTIONS.FILE_UPLOAD,
      icon: <UploadOutlined />
    },
    {
      type: statementTitle || QUESTION_TYPES.STATEMENT,
      description: statementDesc || QUESTION_DESCRIPTIONS.STATEMENT,
      icon: <CopyrightOutlined />
    }
  ]

  const updatedMap =
    (welcomeScreenShowRule &&
      questionTypeMap?.filter(
        (item) => item?.type !== QUESTION_TYPES.WELCOME_SCREEN
      )) ||
    questionTypeMap

  // const hasConditions = questionData?.questionConfigurations?.filter(
  //   (item) => item?.redirectQuestion.length > 0
  // ).length

  return (
    <Box pl={2} display="block">
      <QuestionsTypeMenu>
        {updatedMap?.map((item) => (
          <QuestionMenuItem key={item?.type} onClick={onClick}>
            <Row h="center" v="center" noGutters>
              <Col cw="auto" ml={2}>
                {item?.icon}
              </Col>
              <Col display="grid">
                <Text color="var(--qf-typography-title-color)">
                  {item?.type}
                </Text>
                <Text color="var(--qf-typography-caption-color)">
                  {item?.description}
                </Text>
              </Col>
            </Row>
          </QuestionMenuItem>
        ))}
      </QuestionsTypeMenu>
    </Box>
  )
}

QuestionTypeSelect.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

export default QuestionTypeSelect
