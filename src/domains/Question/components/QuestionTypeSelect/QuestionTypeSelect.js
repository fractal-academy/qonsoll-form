import { Box, Col, Row, Text } from '@qonsoll/react-design'
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
  UploadOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { QUESTION_DESCRIPTIONS, QUESTION_TYPES } from '../../../../constants'
import {
  QuestionMenuItem,
  QuestionsTypeMenu
} from './QuestionTypeSelect.styles'

import PropTypes from 'prop-types'
import React from 'react'
import { useTranslations } from '@qonsoll/translation'

function QuestionTypeSelect(props) {
  const {
    //  questionData,
    onClick,
    welcomeScreenShowRule,
    customQuestionTypes
  } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [COMPUTED_PROPERTIES]
  const questionTypeMap = customQuestionTypes || [
    {
      label: t('Welcome screen'),
      type: QUESTION_TYPES.WELCOME_SCREEN,
      description: t(QUESTION_DESCRIPTIONS.WELCOME_SCREEN),
      icon: <HomeOutlined />
    },
    {
      label: t('Long text'),
      type: QUESTION_TYPES.LONG_TEXT,
      description: t(QUESTION_DESCRIPTIONS.LONG_TEXT),
      icon: <FileTextOutlined />
    },
    {
      label: t('Short text'),
      type: QUESTION_TYPES.SHORT_TEXT,
      description: t(QUESTION_DESCRIPTIONS.SHORT_TEXT),
      icon: <SmallDashOutlined />
    },
    {
      label: t('Date'),
      type: QUESTION_TYPES.DATE,
      description: t(QUESTION_DESCRIPTIONS.DATE),
      icon: <CalendarOutlined />
    },
    {
      label: `${'Yes'}/${'No'}`,
      type: QUESTION_TYPES.YES_NO,
      description: t(QUESTION_DESCRIPTIONS.YES_NO),
      icon: <ShareAltOutlined />
    },
    {
      label: t('Choice'),
      type: QUESTION_TYPES.CHOICE,
      description: t(QUESTION_DESCRIPTIONS.CHOICE),
      icon: <GoldOutlined />
    },
    {
      label: t('Picture choice'),
      type: QUESTION_TYPES.PICTURE_CHOICE,
      description: t(QUESTION_DESCRIPTIONS.PICTURE_CHOICE),
      icon: <PictureOutlined />
    },
    {
      label: t('Opinion scale'),
      type: QUESTION_TYPES.OPINION_SCALE,
      description: t(QUESTION_DESCRIPTIONS.OPINION_SCALE),
      icon: <HomeOutlined />
    },
    {
      label: t('Rating'),
      type: QUESTION_TYPES.RATING,
      description: t(QUESTION_DESCRIPTIONS.RATING),
      icon: <StarOutlined />
    },
    {
      label: t('File upload'),
      type: QUESTION_TYPES.FILE_UPLOAD,
      description: t(QUESTION_DESCRIPTIONS.FILE_UPLOAD),
      icon: <UploadOutlined />
    },
    {
      label: t('Statement'),
      type: QUESTION_TYPES.STATEMENT,
      description: t(QUESTION_DESCRIPTIONS.STATEMENT),
      icon: <CopyrightOutlined />
    },
    {
      label: t('Video answer'),
      type: QUESTION_TYPES.VIDEO_ANSWER,
      description: t(QUESTION_DESCRIPTIONS.VIDEO_ANSWER),
      icon: <VideoCameraOutlined />
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
                  {item?.label}
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
