import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Col, Row } from '@qonsoll/react-design'
import { QUESTION_TYPES } from '../../../../constants'
import { IconRoundContainer } from '../../../../components'
import { useTranslation } from '../../../../context/Translation'
import {
  QuestionsTypeMenu,
  QuestionMenuItem,
  Description
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
  const { data, onClick, welcomeScreenShowRule, customQuestionTypes } = props

  // [ADDITIONAL_HOOKS]
  const {
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
      type: QUESTION_TYPES.WELCOME_SCREEN,
      description: welcomeScreenDesc || 'Invite your audience in',
      icon: <HomeOutlined />
    },
    {
      type: QUESTION_TYPES.LONG_TEXT,
      description: longTextDesc || 'Mote space to spill the beans',
      icon: <FileTextOutlined />
    },
    {
      type: QUESTION_TYPES.SHORT_TEXT,
      description: shortTextDesc || 'For short answers, like names',
      icon: <SmallDashOutlined />
    },
    {
      type: QUESTION_TYPES.DATE,
      description: dateDesc || 'Collect answers in date format',
      icon: <CalendarOutlined />
    },
    {
      type: QUESTION_TYPES.FILE_UPLOAD,
      description: fileUploadDesc || 'Upload a file up to 10MB',
      icon: <UploadOutlined />
    },

    {
      type: QUESTION_TYPES.OPINION_SCALE,
      description: opinionDesc || 'A customizable, numbered scale',
      icon: <HomeOutlined />
    },
    {
      type: QUESTION_TYPES.PICTURE_CHOICE,
      description: pictureChoiceDesc || 'Multiple choice but prettier',
      icon: <PictureOutlined />
    },
    {
      type: QUESTION_TYPES.CHOICE,
      description: choiceDesc || 'Multiple choice',
      icon: <GoldOutlined />
    },
    {
      type: QUESTION_TYPES.RATING,
      description: ratingDesc || 'Rate',
      icon: <StarOutlined />
    },
    {
      type: QUESTION_TYPES.STATEMENT,
      description: statementDesc || 'Take the mic for a moment',
      icon: <CopyrightOutlined />
    },
    {
      type: QUESTION_TYPES.YES_NO,
      description: yesnoDesc || 'Just 2 options: Yes or No',
      icon: <ShareAltOutlined />
    }
  ]

  const updatedMap =
    (welcomeScreenShowRule &&
      questionTypeMap.filter(
        (item) => item.type !== QUESTION_TYPES.WELCOME_SCREEN
      )) ||
    questionTypeMap

  const hasConditions = data?.questionConfigurations.filter(
    (item) => item?.redirectQuestion.length > 0
  ).length

  return (
    <Row
      h="center"
      v="center"
      pl={2}
      noGutters
      display="flex"
      style={{ flex: '1' }}>
      <Col display="block">
        <QuestionsTypeMenu>
          {updatedMap.map((item) => (
            <QuestionMenuItem key={item.type} onClick={onClick}>
              <Row noGutters v="center">
                <Col v="center" cw="auto" mr={2}>
                  <IconRoundContainer>{item.icon}</IconRoundContainer>
                </Col>
                <Col display="block">
                  <Row noGutters>
                    <Col v="center">
                      <Text strong>{item.type}</Text>
                    </Col>
                  </Row>
                  <Row noGutters>
                    <Col>
                      <Description type="secondary">
                        {item.description}
                      </Description>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </QuestionMenuItem>
          ))}
        </QuestionsTypeMenu>
      </Col>
    </Row>
  )
}

QuestionTypeSelect.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

export default QuestionTypeSelect
